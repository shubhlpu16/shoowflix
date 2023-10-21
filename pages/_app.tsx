import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'

import { theme } from '@/styles/theme'
import '@/styles/globals.css'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Shoow: Stream Movies</title>
        <meta name="description" content="An online movie streaming app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
      <script
        src="https://cdn.jsdelivr.net/npm/@webtor/player-sdk-js/dist/index.min.js"
        async
      ></script>
    </>
  )
}

export default MyApp
