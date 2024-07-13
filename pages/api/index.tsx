import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).send('Hello world')
  } else {
    res.status(405).send('Method Not Allowed')
  }
}
