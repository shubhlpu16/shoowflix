// pages/api/socket.js

import { initializeSocket } from '@/middlewares/socket'

export default function handler(req: any, res: any) {
  if (!res.socket.server.io) {
    console.log('Initializing Socket.IO')
    const io = initializeSocket(res.socket.server)
    res.socket.server.io = io
  } else {
    console.log('Socket.IO server already initialized')
  }
  res.end()
}

export const config = {
  api: {
    bodyParser: false // Disable body parsing (required for WebSockets)
  }
}
