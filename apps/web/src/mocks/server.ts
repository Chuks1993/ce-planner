import { setupServer } from 'msw/node'
import { db } from './db'

// for node/test environments
export const server = setupServer(
  ...db.user.toHandlers('graphql', 'http://localhost:4000/graphql')
)
