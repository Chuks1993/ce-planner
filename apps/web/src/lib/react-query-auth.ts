import { useMeQuery, User } from '@src/graphql/generated'
import { useRouter } from 'next/router'

// TODO: Prisma apollo auth
// https://morioh.com/p/54cb57810e00
// https://github.com/wangel13/prisma-next-auth-graphql-starter

type SessionParams = {
  required?: boolean
  redirectTo?: string
  queryConfig?: any
}

export function useSession({
  required,
  redirectTo = '/login',
  queryConfig = {}
}: Partial<SessionParams> = {}): [User, boolean] {
  const router = useRouter()
  const { data: { me = null } = {}, status } = useMeQuery(null, {
    ...queryConfig,
    onSettled: (data, error) => {
      if (queryConfig.onSettled) queryConfig.onSettled(data?.me, error)
      if (data?.me || !required) return
      router.replace(redirectTo + `?next=${router.pathname}`)
    }
  })
  return [me, status === 'loading']
}
