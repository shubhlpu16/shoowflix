import { getQueryParams } from '@/utils/get-query-params'
import { useSwr } from './use-swr'

export const useMovies = (params?: { [key: string]: string } | undefined) => {
  const { data: moviesData, ...rest } = useSwr({
    key: getQueryParams('/list_movies.json', params)
  })

  return { moviesData, ...rest }
}
