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

const saveSubscription = async (subscription) => {
  const response = await fetch(
    'https://movies-production-61af.up.railway.app/api/save-subscription',
    {
      method: 'post',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(subscription)
    }
  )

  return response.json()
}

const subscribeUser = async () => {
  const subscription = await self.registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(
      'BNCR_N209rz2iw20xIKTK5KZHr8Dd8uMZJaBlAXuCajqAy5lFLUVzraMIWozdMbiTqRkw6LglstMkCpYQyPmNa8'
    )
  })

  await saveSubscription(subscription)
}

self.addEventListener('activate', (event) => {
  event.waitUntil(subscribeUser())
})

self.addEventListener('push', (e) => {
  console.log('🚀 ~ self.addEventListener ~ e:', e)
  self.registration.showNotification('Shoowflix', { body: e.data.text() })
})
