import subDatabase from '@/lib/subDatabase'
import webpush from 'web-push'
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
  if (req.method === 'POST') {
    // const { validUsers, commentId, sender } = req.body
    const { validUsers, sender } = req.body

    // const cts = clients.getClients()
    // validUsers.forEach((user) => {
    //   if (cts[user?.id]) {
    //     const notification = {
    //       type: 'mention',
    //       message: `You were mentioned in a comment by @${sender.userName}`,
    //       commentId: commentId,
    //       createdAt: new Date()
    //     }
    //     // Send notification via SSE
    //     cts[user?.id].res.write(`data: ${JSON.stringify(notification)}\n\n`)
    //   }
    // })

    const db = subDatabase.getDatabase()

    console.log('db', db)

    validUsers.forEach((user: any) => {
      if (db[user?.id]) {
        webpush
          .sendNotification(
            db[user?.id],
            `You were mentioned in a comment by @${sender.userName}`
          )
          .then(() =>
            res
              .status(200)
              .json({ success: true, message: 'Notifications processed' })
          )
          .catch((error) =>
            res.status(500).json({ status: 'Error', message: error.toString() })
          )
      }
    })

    res.status(200).json({ status: 'true' })
  } else {
    res.status(405).json({ status: 'Error', message: 'Method not allowed' })
  }
}
