import { useCallback, useEffect } from 'react'
//@ts-ignore
import { EventSourcePolyfill } from 'event-source-polyfill'
import { useSession } from 'next-auth/react'
import axios from 'axios'
// import { headers } from '@/api/api.service'

const useSSE = () => {
  const userSession = useSession()

  //@ts-ignore
  const messageHandler = useCallback(
    async (e: MessageEvent) => {
      const data = JSON.parse(e.data)
      if (!data.message) return

      try {
        await axios.post('/api/send-notification', {
          message: data.message,
          userId: userSession.data?.user?.id
        })
      } catch (error) {
        console.log(error)
      }
    },
    [userSession]
  )

  //@ts-ignore
  const openHandler = useCallback((e) => {
    console.log('CONNECTION OPEN : ', e)
  }, [])

  //@ts-ignore
  const closedHandler = useCallback((e) => {
    console.log('CONNECTION CLOSED : ', e)
  }, [])

  useEffect(() => {
    if (!userSession?.data?.user) return

    const user = userSession.data.user as any

    //TODO: Singleton
    //https://www.digitalocean.com/community/tutorials/nodejs-server-sent-events-build-realtime-app
    var source = new EventSourcePolyfill(`/api/events/?id=${user.id}`, {
      heartbeatTimeout: 120000
    })

    source.addEventListener('message', messageHandler)
    source.addEventListener('open', openHandler)
    source.addEventListener('error', closedHandler)

    return () => {
      source.removeEventListener('message', messageHandler)
      source.removeEventListener('open', openHandler)
      source.removeEventListener('error', closedHandler)
    }
  }, [messageHandler, openHandler, closedHandler, userSession])
}

export default useSSE
