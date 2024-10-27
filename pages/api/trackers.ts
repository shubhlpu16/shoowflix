import { db as prisma } from '@/lib/db'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const trackers = await prisma?.tracker.findMany()
    res.status(200).json(trackers)
  }
}

export default handler
