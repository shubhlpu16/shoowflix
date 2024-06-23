import { NextApiRequest, NextApiResponse } from 'next'
import { db as prisma } from '@/lib/db'
import { getAuth } from './favourite'

const checkFavourite = async (req: NextApiRequest, res: NextApiResponse) => {
  const movieId = req.query.movieId as string
  const user = await getAuth(req, res)

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

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      await checkFavourite(req, res)
  }
}

export default handler
