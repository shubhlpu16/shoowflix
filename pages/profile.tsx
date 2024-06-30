import { useSession } from 'next-auth/react'
import React from 'react'
import useSWR from 'swr'
import { fetcher } from '@/data/use-swr'
import { Loader } from '@/components/loader'
import { Profile } from '@/components/profile'

const MyProfile = () => {
  const { data: session } = useSession()
  const { data: { movieIds } = {}, isLoading } = useSWR(
    [`/api/movies/favourites`],
    fetcher
  )

  if (isLoading) {
    return <Loader />
  }
  return <Profile user={session?.user as any} movieIds={movieIds} />
}

export default MyProfile
