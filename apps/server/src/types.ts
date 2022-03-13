import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import session from 'express-session'
import { Redis } from 'ioredis'

export interface MyContext {
  prisma: PrismaClient
  res: Response
  req: Request & { session: session.Session }
  redis: Redis
}

export type MessageInfo = {
  sendTo: string
  body: string
  sendAt: Date
}
