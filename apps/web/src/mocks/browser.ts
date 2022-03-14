import { setupWorker } from 'msw'
// import { db } from './db'

import { handlers } from './handlers'
// for browser environments
// export const worker = setupWorker(
//   ...db.user.toHandlers('graphql', 'http://localhost:4000/graphql')
// )

// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(...handlers)
