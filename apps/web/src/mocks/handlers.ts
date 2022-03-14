// src/mocks/handlers.js
import { MeDocument } from '@src/graphql/generated'
import { graphql } from 'msw'

export const handlers = [
  // Handles a "Login" mutation
  //   graphql.mutation('Login', null),

  // Handles a "GetUserInfo" query
  graphql.query(MeDocument, (req, res, ctx) => {
    console.log({ req, res, ctx })
    // return res(
    //   ctx.data({
    //     user: {
    //       username: authenticatedUser,
    //       firstName: 'John',
    //     },
    //   }),
    // )
  })
]
