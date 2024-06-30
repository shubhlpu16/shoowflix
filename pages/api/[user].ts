import { NextApiRequest, NextApiResponse } from 'next'
import { db as prisma } from '@/lib/db'

const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { user } = req.query
  const details = await prisma.user.findUnique({
    where: {
      id: user as string
    },
    include: {
      UserFeturedMovies: true
    }
  })

  res.status(200).json({ user: details })
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      await getUser(req, res)
      break
    default:
      res.status(405).json({ error: 'Method not allowed' })
      break
  }
}

export default handler
