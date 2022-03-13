import argon2 from 'argon2'
import {
  ACTIVATE_ACCOUNT_PREFIX,
  COOKIE_NAME,
  FORGET_PASSWORD_PREFIX
} from '@src/constants'
import { activationEmail, resetPassword, sendEmail } from '@src/utils'
import { v4 as uuidv4 } from 'uuid'

import type { Resolvers } from '../generated'

export const resolvers: Resolvers = {
  Query: {
    me: async (_, __, { req, prisma }) => {
      if (!req.session.userId) return null
      return (await prisma.user.findFirst({
        where: {
          id: req.session.userId
        },
        include: {
          phoneNumbers: true
        }
      })) as any
    }
  },
  Mutation: {
    createUser: async (_, args, context) => {
      const { input } = args
      try {
        const user = await context.prisma.user.findFirst({
          where: { email: input.email }
        })
        if (user) return { error: 'Email already exists' }
        const token = uuidv4()
        const html = activationEmail(token)
        const password = await argon2.hash(input.password)
        await context.redis.set(
          ACTIVATE_ACCOUNT_PREFIX + token,
          JSON.stringify({
            ...input,
            password
          }),
          'ex',
          1000 * 60 * 60 * 24 * 7
        ) // 7 days

        await sendEmail(
          process.env.EMAIL_FROM,
          input.email,
          'Account activation',
          html
        )
        return {
          data: true
        }
      } catch (error: any) {
        if (error.code === 'P2002') return { error: 'Email already exist' }
        // TODO: Fix error handling
        console.log(error)
        return { error: 'something went wrong trying to create user' }
      }
    },
    loginUser: async (_, { input }, context) => {
      try {
        const user = await context.prisma.user.findFirst({
          where: {
            email: input.email
          }
        })
        if (!user) return { error: `Unable to find user with ${input.email}` }
        const valid = await argon2.verify(user.password, input.password)
        if (!valid) return { error: 'Incorrect email or password' }
        context.req.session.userId = user.id
        return { data: user }
      } catch (error) {
        console.log(error)
        return { error: 'Something went wrong logging in' }
      }
    },
    logoutUser: async (_, __, { req, res }) => {
      return new Promise(resolve =>
        req.session.destroy(err => {
          res.clearCookie(COOKIE_NAME)
          if (err) {
            console.log(err)
            resolve(false)
            return
          }
          resolve(true)
        })
      )
    },
    activateAccount: async (_, { token }, { redis, prisma }) => {
      try {
        const key = ACTIVATE_ACCOUNT_PREFIX + token
        const res = await redis.get(key)
        if (!res) return { error: 'token expired' }
        const { phoneNumber, ...rest } = JSON.parse(res)
        await prisma.user.create({
          data: {
            ...rest,
            defaultNumber: phoneNumber,
            phoneNumbers: {
              create: [
                {
                  number: phoneNumber
                }
              ]
            }
          }
        })

        await redis.del(key)
        return { data: true }
      } catch (error) {
        console.log('activate account', error)
        return { error: 'Unable to activate account' }
      }
    },
    forgetPassword: async (_, { input }, { prisma, redis }) => {
      try {
        const user = await prisma.user.findFirst({
          where: { email: input.email }
        })
        if (!user) return { error: 'There is no account with that email' }
        const token = uuidv4()
        const html = resetPassword(token)
        await redis.set(
          FORGET_PASSWORD_PREFIX + token,
          user.id,
          'ex',
          1000 * 60 * 60 * 24 * 7
        ) // 7 days

        await sendEmail(
          process.env.EMAIL_FROM,
          user.email,
          'Password Reset',
          html
        )
        // TODO:
        return {
          // data: `Email has been sent to ${user.email}. Follow the instruction to reset your password`
          data: true
        }
      } catch (error: any) {
        console.log(error)
        // TODO: Fix error handling
        return {
          error: 'Something went wrong trying to send to reset password email'
        }
      }
    },
    resetPassword: async (_, { input }, { prisma, redis }) => {
      try {
        const key = FORGET_PASSWORD_PREFIX + input.token
        const userId = await redis.get(key)
        if (!userId) return { error: 'token expired' }
        const password = await argon2.hash(input.password)
        await prisma.user.update({
          where: { id: userId },
          data: {
            password
          }
        })
        await redis.del(key)
        return { data: true }
      } catch (error) {
        console.log(error)
        return { error: 'Something went wrong trying to reset password' }
      }
    },
    updateUser: async (_, { input }, { req, prisma }) => {
      if (!req.session.userId) return { error: 'Please sign in' }
      try {
        const { defaultNumber, ...rest } = input
        const data = await prisma.user.update({
          where: { id: req.session.userId },
          data: {
            ...rest
          }
        })

        return { data }
      } catch (err: any) {
        console.log(err)
        if (err.code === 'P2002') return { error: 'Email already exist' }
        return { error: 'Error while trying to edit user' }
      }
    }
  }
}
