import { render } from '@testing-library/react'
import { GraphQLHandler, GraphQLRequest } from 'msw'
import { QueryClient, QueryClientProvider } from 'react-query'
import { server } from './server'

const queryClient = new QueryClient()
const Providers = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

const customRender = (ui, options = {}) =>
  render(ui, { wrapper: Providers, ...options })

export * from '@testing-library/react'

export { customRender as render }

// export const testRenderer =
//   (children: React.ReactNode) =>
//   (responseOverride?: GraphQLHandler<GraphQLRequest<never>>) => {
//     if (responseOverride) {
//       server.use(responseOverride)
//     }
//     render(children, { wrapper: Providers}
//     )
//   }
