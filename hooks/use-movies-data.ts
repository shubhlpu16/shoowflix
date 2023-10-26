import { useMemo } from 'react'

export const useMoviesData = (moviesData: any) => {
  const movies = useMemo(() => {
    const moviesArray = moviesData?.data?.movies
    if (!moviesArray?.length) {
      return []
    }
    return moviesArray
  }, [moviesData])

  return { count: moviesData?.data?.movieCount, movies }
}
