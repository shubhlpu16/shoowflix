import { getQueryParams } from '@/utils/get-query-params'
import { useSwr } from './use-swr'

export const useMovies = (
  params?: { [key: string]: string } | undefined,
  execute?: boolean
) => {
  const { data, ...rest } = useSwr({
    key: getQueryParams('/list_movies.json', params),
    execute
  })

  return { moviesData: data, ...rest }
}
