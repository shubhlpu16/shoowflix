import { db as prisma } from '@/lib/db'
import { getSocket } from '@/lib/socket'
import { auth } from '@/middlewares/auth'
import { Request, Response } from '@/types'

const buildCommentTree = (comments: any[], parentId = null) => {
  const nestedComments: any[] = []

  comments.forEach((comment) => {
    if (comment.parentId === parentId) {
      const children = buildCommentTree(comments, comment.id)

      if (children.length) {
        comment.replies = children
      }

      nestedComments.push(comment)
    }
  })

  return nestedComments
}

const getComments = async (req: Request, res: Response) => {
  const { movieId } = req.query
  const comments = await prisma.comments.findMany({
    where: {
      movieId: movieId as string
    },
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      commentedBy: true
    }
  })

  res.status(200).json({ comments: buildCommentTree(comments) })
}

const createComment = async (req: Request, res: Response) => {
  try {
    const { movieId, id: parentId } = req.query
    const { text, upVotes, downVotes } = req.body
    const user = req.user
    const mentions =
      text
        .match(/@[a-zA-Z0-9._-]+/g)
        ?.map((mention: string | any[]) => mention.slice(1)) || []
    const validUsers = await prisma.user.findMany({
      where: { userName: { in: mentions } }
    })

    const comment = await prisma.comments.create({
      data: {
        text,
        upVotes,
        downVotes,
        movieId: movieId as string,
        parentId: parentId as string | null,
        userId: user?.id
      }
    })

    if (validUsers.length > 0) {
      const notifications = validUsers.map((user) => ({
        userId: user.id,
        type: 'mention',
        message: `You were mentioned in a comment by @${user.userName}`,
        commentId: comment.id
      }))

      await prisma.notification.createMany({
        data: notifications
      })
      //@ts-ignore
      getSocket().emit('sendNotification', {
        validUsers,
        commentId: comment.id
      })
    }

    res.status(201).json({ comment })
  } catch (error) {
    console.error(error)
  }
}

const updateComment = async (req: Request, res: Response) => {
  const { id: commentId } = req.query
  const { upVotes, downVotes } = req.body

  const comment = await prisma.comments.update({
    where: {
      id: commentId as string
    },
    data: {
      upVotes,
      downVotes
    }
  })

  res.status(200).json({ comment })
}

const comments = async (req: Request, res: Response) => {
  switch (req.method) {
    case 'GET':
      await getComments(req, res)
      break
    case 'POST':
      await auth(req, res, () => createComment(req, res))
      break
    case 'PUT':
      await auth(req, res, () => updateComment(req, res))
      break
    default:
      res.status(405).end('Method Not Allowed')
      break
  }
}

export default comments
