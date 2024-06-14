import { useSwr } from './use-swr'

export const useMoviesSuggestions = (movieId: string, execute?: boolean) => {
  const { data: suggestedMoviesData, ...rest } = useSwr({
    key: `/movie_suggestions.json?movie_id=${movieId}`,
    execute
  })

  return { suggestedMoviesData, ...rest }
}
