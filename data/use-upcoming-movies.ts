import { useSwr } from './use-swr'

export const useUpcommingMovies = () => {
  const { data: suggestedMoviesData, ...rest } = useSwr({
    key: `list_upcoming.json`
  })

  return { suggestedMoviesData, ...rest }
}
