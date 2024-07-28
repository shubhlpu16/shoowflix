import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'

import { theme } from '@/styles/theme'
import '@/styles/globals.scss'
import { Navbar } from '@/components/navbar'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { SessionProvider, getSession } from 'next-auth/react'
import { useEffect } from 'react'
import axios from 'axios'
import { getSocket } from '@/lib/socket'
import Head from 'next/head'

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
    await navigator.serviceWorker
      .register('/sw1.js')
      .then(() => {
        console.log('Service worker registered')
      })
      .catch(() => {
        console.log('Service worker registration failed')
      })
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

  useEffect(() => {
    const socket = getSocket()
    let user: any
    if (!socket.connected) {
      socket.connect()
    }
    const initializeSocket = async () => {
      const session = await getSession()
      user = session?.user || {}
      socket.emit('join', user?.id)
    }

    socket.on('connect', initializeSocket)

    socket.on('disconnect', (reason: any) => {
      console.log('Disconnected from Socket.IO server:', reason)
      // The server disconnected the socket, we need to manually reconnect
      socket.connect()
    })

    socket.on('reconnect', () => {
      socket.emit('registerUser', user?.id)
    })

    socket.on('notification', async (notification: any) => {
      try {
        await axios.post(
          'https://movies-production-61af.up.railway.app/api/send-notification',
          {
            message: notification.message
          }
        )
      } catch (error) {
        console.log(error)
      }
      // Handle the real-time notification, e.g., update the state or show a toast
    })
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
          href="https://shoowflix.vercel.app/maskable_icon_x192.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="192x192"
          href="https://shoowflix.vercel.app/maskable_icon_x192.png"
        />

        <meta name="title" content="Shoowflix - Stream Movies" />
        <meta
          name="description"
          content="Torrent streaming website without ads "
        />
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
