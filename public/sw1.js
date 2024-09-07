const urlBase64ToUint8Array = (base64String) => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')

  const rawData = atob(base64)
  // eslint-disable-next-line no-undef
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }

  return outputArray
}

const saveSubscription = async (subscription, userId) => {
  const data = {
    subscription: subscription,
    userId
  }
  const response = await fetch('/api/save-subscription', {
    method: 'post',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(data)
  })

  return response.json()
}

const subscribeUser = async (userId) => {
  console.log("🚀 ~ subscribeUser ~ userId:", userId)
  const subscription = await self.registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(
      'BNCR_N209rz2iw20xIKTK5KZHr8Dd8uMZJaBlAXuCajqAy5lFLUVzraMIWozdMbiTqRkw6LglstMkCpYQyPmNa8'
    )
  })

  await saveSubscription(subscription, userId)
}

// self.addEventListener('activate', (event) => {
//   event.waitUntil(subscribeUser())
// })

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'INITIALIZE_SOCKET') {
    const { userId } = event.data.payload
    console.log('Condition met for user:', userId)

    // Perform actions based on the condition
    event.waitUntil(subscribeUser(userId))
  }
})

self.addEventListener('push', (e) => {
  self.registration.showNotification('Shoowflix', { body: e.data.text() })
})
