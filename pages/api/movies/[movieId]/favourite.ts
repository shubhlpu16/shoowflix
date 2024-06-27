import { auth } from './../../../../middlewares/auth'
import { Request, Response } from '@/types'
import { db as prisma } from '@/lib/db'

const postFavourite = async (req: Request, res: Response) => {
  const { movieId } = req.query
  const user = req.user

  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const featuredMovies = await prisma.userFeturedMovies.findUnique({
    where: {
      userId: user?.id
    }
  })

  if (featuredMovies?.movieIds.includes(movieId as string)) {
    await prisma.userFeturedMovies.update({
      where: {
        userId: user?.id
      },
      data: {
        movieIds: featuredMovies.movieIds.filter((id) => id !== movieId)
      }
    })

    return res.status(200).json({ message: 'Movie removed from favorites' })
  }

  if (!featuredMovies) {
    await prisma.userFeturedMovies.create({
      data: {
        userId: user?.id || '',
        movieIds: [movieId as string]
      }
    })
  } else {
    await prisma.userFeturedMovies.update({
      where: {
        userId: user?.id
      },
      data: {
        movieIds: [...featuredMovies.movieIds, movieId as string]
      }
    })
  }

  res.status(201).json({ message: 'Movie added to favorites' })
}

const handler = async (req: Request, res: Response) => {
  switch (req.method) {
    case 'POST':
      await auth(req, res, () => postFavourite(req, res))
      break
    default:
      res.status(405).json({ error: 'Method not allowed' })
      break
  }
}

export default handler
