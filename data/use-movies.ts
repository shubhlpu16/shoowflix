import { getQueryParams } from '@/utils/get-query-params'
import { useSwr } from './use-swr'
import { useMoviesData } from '@/hooks/use-movies-data'

export const useMovies = (
  params?: { [key: string]: string | any } | undefined,
  execute?: boolean
) => {
  const { data, ...rest } = useSwr({
    key: getQueryParams('/list_movies.json', params),
    execute
  })

  const movies = useMoviesData(data)

  return { moviesData: movies, ...rest }
}
