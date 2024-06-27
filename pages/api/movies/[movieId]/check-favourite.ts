import { db as prisma } from '@/lib/db'
import { auth } from '@/middlewares/auth'
import { Request, Response } from '@/types'

const checkFavourite = async (req: Request, res: Response) => {
  const movieId = req.query.movieId as string
  const user = req.user

  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const featuredMovies = await prisma.userFeturedMovies.findUnique({
    where: {
      userId: user?.id
    }
  })

  if (!featuredMovies) {
    return res.status(200).json({ isFavourite: false })
  }

  if (featuredMovies.movieIds.includes(movieId)) {
    return res.status(200).json({ isFavourite: true })
  }

  return res.status(200).json({ isFavourite: false })
}

const handler = async (req: Request, res: Response) => {
  switch (req.method) {
    case 'GET':
      await auth(req, res, () => checkFavourite(req, res))
      break
    default:
      res.status(405).end('Method Not Allowed')
      break
  }
}

export default handler
