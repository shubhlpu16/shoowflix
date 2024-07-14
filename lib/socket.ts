import { io } from 'socket.io-client'

const socket = io({
  path: '/api/socket',
  reconnectionAttempts: 5, // Limit the number of reconnection attempts
  timeout: 10000, // Connection timeout (ms)
  transports: ['websocket'] // Specify transport method
})

export default socket
