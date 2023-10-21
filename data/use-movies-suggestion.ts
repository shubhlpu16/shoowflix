import { useSwr } from './use-swr'

export const useMoviesSuggestions = (movieId: string) => {
  const { data: suggestedMoviesData, ...rest } = useSwr({
    key: `/movie_suggestions.json?movie_id=${movieId}`
  })

  return { suggestedMoviesData, ...rest }
}
