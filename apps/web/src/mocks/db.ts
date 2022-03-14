import type { User } from '@src/graphql/generated'
import { factory, primaryKey } from '@mswjs/data'

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'jonSnow@winterfell.got',
    firstName: 'Jon',
    lastName: 'Snow',
    defaultNumber: '1111111111'
  },
  {
    id: '2',
    email: 'aryaStark@winterfell.got',
    firstName: 'Arya',
    lastName: 'Stark',
    defaultNumber: '2222222222'
  }
]

export const db = factory({
  user: {
    id: primaryKey(() => '123'),
    name: () => 'Firstname',
    email: () => 'email@email.com'
  }
})

mockUsers.forEach(user => db.user.create(user))
