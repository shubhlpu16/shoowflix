import { NextApiRequest, NextApiResponse } from 'next'
import subDatabase from '../../lib/subDatabase'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    subDatabase.push(req.body)
    res.status(200).json({ status: 'Success', message: 'Subscription saved!' })
  } else {
    res.status(405).send('Method Not Allowed')
  }
}
