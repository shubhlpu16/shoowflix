import { useMemo } from 'react'

export const useMoviesData = (moviesData: any) => {
  const movies = useMemo(() => {
    if (!moviesData?.length) {
      return []
    }
    return moviesData.filter((movie: any) => movie.name)
  }, [moviesData])
  return movies
}
