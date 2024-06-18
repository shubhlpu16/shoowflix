import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'

import { theme } from '@/styles/theme'
import '@/styles/globals.scss'
import Head from 'next/head'
import { Navbar } from '@/components/navbar'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Shoow: Stream Movies</title>
        <meta name="description" content="An online movie streaming app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          href="https://shoowflix.vercel.app/apple-touch-icon.png"
        />
      </Head>
      <Head>
        <title>Shoowflix - Stream Movies</title>
        <meta name="title" content="Shoowflix - Stream Movies" />
        <meta
          name="description"
          content="Torrent streaming website without ads "
        />
      </Head>
      <Head>
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://shoowflix.vercel.app" />
        <meta property="og:title" content="Shoowflix - Stream Movies" />
        <meta
          property="og:description"
          content="Torrent streaming website without ads "
        />
        <meta
          property="og:image"
          content="https://shoowflix.vercel.app/background.png"
        />
      </Head>
      <Head>
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://shoowflix.vercel.app" />
        <meta property="twitter:title" content="Shoowflix - Stream Movies" />
        <meta
          property="twitter:description"
          content="Torrent streaming website without ads "
        />
        <meta
          property="twitter:image"
          content="https://shoowflix.vercel.app/background.png"
        />
      </Head>
      <ChakraProvider theme={theme}>
        <Navbar />
        <Component {...pageProps} />
        <Analytics />
        <SpeedInsights />
      </ChakraProvider>
      <script
        src="https://cdn.jsdelivr.net/npm/@webtor/player-sdk-js/dist/index.min.js"
        async
      ></script>
    </>
  )
}

export default MyApp
