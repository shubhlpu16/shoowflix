import subDatabase from '@/lib/subDatabase'
import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { subscription, userId } = req.body
  const db = subDatabase.getDatabase()
  db[userId] = subscription
  res.status(200).json({ status: 'Success', message: 'Subscription saved!' })
}
