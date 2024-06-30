import React from 'react'
import { useRouter } from 'next/router'
import { Profile } from '@/components/profile'
import { Loader } from '@/components/loader'
import useSWR from 'swr'
import { fetcher } from '@/data/use-swr'

const UserProfile = () => {
  const router = useRouter()
  const {
    query: { id = '' }
  } = router

  const { data: { user } = {}, isLoading } = useSWR(
    id ? [`/api/${id}`] : null,
    fetcher
  )

  const movieIds = user?.userFeturedMovies[0]?.movieIds

  if (isLoading) {
    return <Loader />
  }

  return <Profile user={user} movieIds={movieIds} />
}

export default UserProfile
