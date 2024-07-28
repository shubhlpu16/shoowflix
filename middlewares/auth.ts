import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { db as prisma } from '@/lib/db'

export const auth = async (req: any, res: any, next: any) => {
  // @ts-ignore
  const session = await getServerSession(req, res, authOptions)
  try {
    const user = await prisma.user.findUnique({
      where: {
        // @ts-ignore
        email: session.user?.email || ''
      }
    })

    req.user = user
    next()
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' })
  }
}
