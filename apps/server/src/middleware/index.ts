import type { Prisma } from '@prisma/client'

export const isAuth: Prisma.Middleware = async (params, next) => {
  console.log({ params })
  return await next(params)
}
