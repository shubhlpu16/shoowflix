import { NextApiRequest, NextApiResponse } from 'next'
import { db as prisma } from '@/lib/db'
import { getServerSession } from 'next-auth'
import authOptions from '@/pages/api/auth/[...nextauth]'

export const getAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions)
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  const user = await prisma.user.findUnique({
    where: {
      // @ts-ignore
      email: session.user?.email || ''
    }
  })

  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  return user
}

const postFavourite = async (req: NextApiRequest, res: NextApiResponse) => {
  const movieId = req.body.movieId as string
  const user = await getAuth(req, res)

  const featuredMovies = await prisma.userFeturedMovies.findUnique({
    where: {
      userId: user?.id
    }
  })

  if (featuredMovies?.movieIds.includes(movieId)) {
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
        movieIds: [movieId]
      }
    })
  } else {
    await prisma.userFeturedMovies.update({
      where: {
        userId: user?.id
      },
      data: {
        movieIds: [...featuredMovies.movieIds, movieId]
      }
    })
  }

  res.status(201).json({ message: 'Movie added to favorites' })
}

const getFavourites = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await getAuth(req, res)

  const featuredMovies = await prisma.userFeturedMovies.findUnique({
    where: {
      userId: user?.id
    }
  })

  res.status(200).json({ movieIds: featuredMovies?.movieIds || [] })
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST':
      await postFavourite(req, res)
      break
    case 'GET':
      await getFavourites(req, res)
      break
    default:
      res.status(405).json({ error: 'Method not allowed' })
      break
  }
}

export default handler
