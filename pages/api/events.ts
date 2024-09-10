import webpush from 'web-push'
import clients from '@/lib/clients'
import { NextApiRequest, NextApiResponse } from 'next'

const apiKeys = {
  pubKey:
    'BNCR_N209rz2iw20xIKTK5KZHr8Dd8uMZJaBlAXuCajqAy5lFLUVzraMIWozdMbiTqRkw6LglstMkCpYQyPmNa8',
  privKey: 'HXZ2m2tDbU7XOV0b6CX0zHDFds11PBADBNx9Puf05rU'
}

webpush.setVapidDetails(
  'mailto:shubh.lpu16@gamil.com',
  apiKeys.pubKey,
  apiKeys.privKey
)

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    //https://github.com/vercel/next.js/discussions/48427
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')
    res.setHeader('Content-Encoding', 'none')

    const userId = req.query.id
    const newClient = {
      id: userId,
      res
    }

    const cts = clients.getClients()
    //@ts-ignore
    cts[userId] = newClient
    res.write(`data: "Started"\n\n`)

    req.on('close', () => {
      res.end()
    })
  } else {
    res.status(405).json({ status: 'Error', message: 'Method not allowed' })
  }
}
