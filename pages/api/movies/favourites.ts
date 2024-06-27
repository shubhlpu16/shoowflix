import { Request, Response } from '@/types'
import { db as prisma } from '@/lib/db'
import { auth } from '../../../middlewares/auth'

const getFavourites = async (req: Request, res: Response) => {
  const user = req.user

  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const featuredMovies = await prisma.userFeturedMovies.findUnique({
    where: {
      userId: user?.id
    }
  })

  res.status(200).json({ movieIds: featuredMovies?.movieIds || [] })
}

const handler = async (req: Request, res: Response) => {
  switch (req.method) {
    case 'GET':
      await auth(req, res, () => getFavourites(req, res))
      break
    default:
      res.status(405).json({ error: 'Method not allowed' })
      break
  }
}

export default handler
