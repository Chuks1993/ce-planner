import type { AppProps } from 'next/app'
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import { ChakraProvider, myTheme } from 'ui'
import { QueryClient, QueryClientProvider } from 'react-query'
// import '@fontsource/nova-mono'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const queryClient = new QueryClient()
  const getLayout = Component.getLayout ?? (page => page)
  return (
    <ChakraProvider theme={myTheme}>
      <QueryClientProvider client={queryClient}>
        {getLayout(<Component {...pageProps} />)}
      </QueryClientProvider>
    </ChakraProvider>
  )
}

export default MyApp
