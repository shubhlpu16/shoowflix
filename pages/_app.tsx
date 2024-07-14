import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'

import { theme } from '@/styles/theme'
import '@/styles/globals.scss'
import Head from 'next/head'
import { Navbar } from '@/components/navbar'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { SessionProvider } from 'next-auth/react'
import { useEffect } from 'react'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const checkPermission = () => {
    if (!('serviceWorker' in navigator)) {
      throw new Error('No support for service worker!')
    }

    if (!('Notification' in window)) {
      throw new Error('No support for notification API')
    }

    if (!('PushManager' in window)) {
      throw new Error('No support for Push API')
    }
  }

  const registerSW = async () => {
    const registration = await navigator.serviceWorker.register('/sw1.js')
    console.log('🚀 ~ registerSW ~ registration:', registration)
    return registration
  }

  const requestNotificationPermission = async () => {
    const permission = await Notification.requestPermission()

    if (permission !== 'granted') {
      throw new Error('Notification permission not granted')
    }
  }

  const main = async () => {
    checkPermission()
    await requestNotificationPermission()
    await registerSW()
  }

  useEffect(() => {
    main()
  }, [])

  return (
    <>
      <Head>
        <title>Shoow: Stream Movies</title>
        <link rel="manifest" href="/manifest.json" />
        <meta name="description" content="An online movie streaming app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          href="https://shoowflix.vercel.app/maskable_iconx192.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="192x192"
          href="https://shoowflix.vercel.app/maskable_iconx192.png"
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
      <SessionProvider session={session}>
        <ChakraProvider theme={theme}>
          <Navbar />
          <Component {...pageProps} />
          <Analytics />
          <SpeedInsights />
        </ChakraProvider>
      </SessionProvider>
      <script
        src="https://cdn.jsdelivr.net/npm/@webtor/embed-sdk-js/dist/index.min.js"
        async
      ></script>
    </>
  )
}

export default MyApp
