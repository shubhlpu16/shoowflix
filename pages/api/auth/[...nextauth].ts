/* eslint-disable no-useless-escape */
import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import { db as prisma } from '@/lib/db'

export const authOptions = {
  adapter: PrismaAdapter(prisma) as any,

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      httpOptions: {
        timeout: 40000
      }
    })
    // GithubProvider({
    //   clientId: process.env.GITHUB_CLIENT_ID as string,
    //   clientSecret: process.env.GITHUB_CLIENT_SECRET as string
    // })
  ],
  callbacks: {
    async session({ session, token }: any) {
      if (session) {
        session.user.id = token.id
        session.user.userName = token.userName
      }
      return session
    },
    async jwt({ token, user }: any) {
      if (user) {
        token.userName = user.email.replace(/@[^@]+$/, '')
        token.id = user.id
      }
      return token
    },
    async signIn({ user }: any) {
      const email = user.email
      const existingUser = await prisma.user.findUnique({
        where: { email }
      })

      if (!existingUser) {
        await prisma.user.create({
          data: {
            email: user.email,
            name: user.name,
            userName: user.email.replace(/@[^@]+$/, ''),
            image: user.image
          }
        })
      } else {
        await prisma.user.update({
          where: { email },
          data: {
            name: user.name,
            userName: user.email.replace(/@[^@]+$/, ''),
            image: user.image
          }
        })
      }

      return true
    }
  },
  // callbacks: {
  //   async session(
  //     session: { user: { username: any } },
  //     user: { name: any; email: any }
  //   ) {
  //     console.log('🚀 ~ user:', session, user)
  //     // // eslint-disable-next-line no-useless-escape
  //     // if (user) session.user.username = user.email.replace(`/@(\w+)/g`, '')
  //     return session
  //   },
  //   async jwt(token: { username: any }, user: { name: any; email: any }) {
  //     if (user) {
  //       // eslint-disable-next-line no-useless-escape
  //       token.username = user.email.replace(`/@(\w+)/g`, '')
  //     }
  //     return token
  //   }
  // },
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET
}

// @ts-ignore
export default NextAuth(authOptions)
