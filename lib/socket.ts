// lib/socket.js

import { io } from 'socket.io-client'

let socket: any

export const getSocket = () => {
  if (!socket) {
    socket = io({
      path: '/api/socket'
    })
  }
  return socket
}
