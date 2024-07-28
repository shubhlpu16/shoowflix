// lib/socket.js

import { io, Socket } from 'socket.io-client'

let socket: Socket | undefined

export const getSocket = (): Socket => {
  if (!socket) {
    socket = io('https://movies-production-61af.up.railway.app', {
      timeout: 10000,
      transports: ['websocket'],
      reconnectionAttempts: Infinity, // Number of reconnection attempts
      reconnectionDelay: 1000, // Delay between reconnection attempts in ms
      reconnectionDelayMax: 5000, // Maximum delay between reconnections in ms
      randomizationFactor: 0.5 // Randomization factor between reconnections
    })
  }
  return socket
}
