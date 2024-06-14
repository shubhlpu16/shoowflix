import { getQueryParams } from '@/utils/get-query-params'
import { useSwr } from './use-swr'

export const useMoviesDetails = (
  params: {
    movie_id: string
    with_cast?: boolean
    with_images?: boolean
  },
  execute?: boolean
) => {
  const { data: movieDetails, ...rest } = useSwr({
    key: getQueryParams(
      '/movie_details.json',
      params as { [key: string]: any }
    ),
    execute
  })

  return { movieDetails: movieDetails, ...rest }
}
