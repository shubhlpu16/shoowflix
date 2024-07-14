import { Server } from 'socket.io'

export const config = {
  api: {
    bodyParser: false
  }
}

let io

const ioHandler = (req: any, res: any) => {
  if (!res.socket.server.io) {
    console.log('Setting up Socket.IO server...')
    io = new Server(res.socket.server, {
      path: '/api/socket'
    })
    res.socket.server.io = io

    io.on('connection', (socket) => {
      console.log('New client connected:', socket.id)
      socket.on('join', (userId) => {
        socket.join(userId)
      })

      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id)
      })
    })
  } else {
    console.log('Socket.IO server already set up.')
  }
  res.end()
}

export default ioHandler
