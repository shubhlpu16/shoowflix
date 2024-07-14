// lib/socket.js

import { Server } from 'socket.io'

let io: any

export const initializeSocket = (server: any) => {
  if (!io) {
    io = new Server(server, {
      path: '/api/socket',
      cors: {
        origin: '*', // Adjust this to your needs
        methods: ['GET', 'POST']
      }
    })

    io.on('connection', (socket: any) => {
      console.log('New client connected', socket.id)

      socket.on('join', (userId: any) => {
        socket.join(userId)
        console.log(`User ${userId} joined`)
      })

      socket.on('disconnect', () => {
        console.log('Client disconnected', socket.id)
      })
    })
  }
  return io
}
