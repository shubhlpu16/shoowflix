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
  const db = subDatabase.getDatabase()
  if (db[req.body.userId]) {
    webpush
      .sendNotification(db[req.body.userId], req.body.message)
      .then(() => {
        res.status(200).send({
          status: 'Success',
          message: 'Message sent to push service'
        })
      })
      .catch((error) => {
        res.status(500).json({ status: 'Error', message: error.toString() })
      })
  } else {
    res.status(400).json({ status: 'Error', message: 'No subscriptions found' })
  }
}
