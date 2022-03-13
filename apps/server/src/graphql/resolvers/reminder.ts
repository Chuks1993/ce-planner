import {
  sendTwilioCode,
  verifyTwilioCode,
  scheduleTwilioSms,
  cancelTwilioSms
} from '@src/utils'
import type { Resolvers } from '../generated'

export const resolvers: Resolvers = {
  Query: {
    reminders: async (_, __, context) => {
      // context.prisma.$use((params, next) => )
      try {
        const user = await context.prisma.user.findUnique({
          where: { id: context.req.session.userId },
          include: {
            reminders: {
              take: 10,
              where: { status: 'scheduled' },
              orderBy: [{ createdAt: 'desc' }]
            }
          }
        })
        if (!user) return { error: 'Not logged in!' }
        return {
          data: user.reminders as any
        }
      } catch (error) {
        return { error: 'Unable to retreive reminders' }
      }
    }
  },
  Mutation: {
    sendVerificationCode: async (_, { input }, __) => {
      const { phoneNumber } = input
      try {
        const data = await sendTwilioCode(phoneNumber)
        if (!data)
          return { error: 'Error while trying to send verification code' }
        return { data }
      } catch (err) {
        console.log(err)
        return { error: 'Error while trying to send verification code' }
      }
    },
    verifyCode: async (_, { input }, { prisma, req }) => {
      const { code, sid, sendTo, verifyAndAdd } = input
      try {
        const { status } = await verifyTwilioCode({ code, sid, sendTo })
        if (status !== 'approved')
          return { error: 'Error while trying to send verification code' }
        if (verifyAndAdd) {
          if (!req.session.userId) return { error: 'Must be signed in.' }
          // TODO: Prevent user from adding same number
          await prisma.user.update({
            where: {
              id: req.session.userId
            },
            data: {
              defaultNumber: sendTo,
              phoneNumbers: {
                create: [
                  {
                    number: sendTo
                  }
                ]
              }
            }
          })
        }
        return { data: true }
      } catch (err: any) {
        if (err?.code === 'P2002') return { error: 'Email already exist' }
        console.log(err)
        return { error: 'Error while trying to verify code' }
      }
    },
    createReminder: async (_, { input }, context) => {
      const user = await context.prisma.user.findUnique({
        where: {
          id: context.req.session.userId
        }
      })
      if (!user) return { error: 'Need to be signed in.' }
      try {
        const { eventCelebrant, eventTitle } = input
        const sendAt = new Date(input.sendAt)
        const body = `Hey ${user.firstName}, this is a reminder for ${eventCelebrant}'s ${eventTitle}`
        const sms = await scheduleTwilioSms({
          sendTo: input.phoneNumber,
          sendAt,
          body
        })
        const reminder = await context.prisma.reminder.create({
          data: {
            sendTo: sms.to,
            sendAt,
            status: sms.status,
            sid: sms.sid,
            body: sms.body,
            userId: user.id,
            eventCelebrant,
            eventTitle
          }
        })
        return { data: reminder as any }
      } catch (error) {
        console.log(error)
        return {
          error: 'Something went wrong when trying to create the reminder'
        }
      }
    },
    deleteReminder: async (_, args, context) => {
      const { input } = args
      if (!context.req.session.userId) return { error: 'Need to be signed in' }

      try {
        const user = await context.prisma.user.findFirst({
          where: {
            id: context.req.session.userId
          },
          include: {
            reminders: {
              where: {
                id: input.reminderId
              }
            }
          }
        })

        if (!user)
          return {
            error: 'You do not have access to that reminder or cant find user'
          }

        cancelTwilioSms(user?.reminders[0].sid)
        await context.prisma.reminder.delete({
          where: {
            id: input.reminderId
          }
        })
        return { data: true }
      } catch (error) {
        console.log(error)
        return {
          error: 'Something went wrong when trying to delete the reminder'
        }
      }
    }
  }
}
