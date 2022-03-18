import 'dotenv-safe/config'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import session from 'express-session'
import connectRedis from 'connect-redis'
import Redis from 'ioredis'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

import { COOKIE_NAME, __prod__ } from '@src/constants'
import { typeDefs, resolvers } from '@src/graphql'
import { MyContext } from '@src/types'

async function main() {
  const app = express()
  const RedisStore = connectRedis(session)
  const redis = new Redis(process.env.REDIS_URL)
  const prisma = new PrismaClient()
  const port = parseInt(process.env.PORT) || 4000

  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true
    })
  )

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true
      }),
      cookie: {
        maxAge: 100 * 60 * 60 * 24 * 365,
        httpOnly: true,
        sameSite: 'lax',
        secure: __prod__,
        domain: __prod__ ? '.ce-planner.com' : undefined
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET,
      resave: false
    })
  )

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }): MyContext => ({ req, res, redis, prisma }),
    debug: !__prod__
  })

  await apolloServer.start()
  apolloServer.applyMiddleware({ app, cors: false })

  app.listen(port, () => {
    console.log(`
    🚀  Server is ready at PORT: ${port}
  `)
  })
}

main().catch(err => {
  console.error(err)
})
