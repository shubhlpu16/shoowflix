import { useSwr } from './use-swr'

export const useUpcommingMovies = () => {
  const { data: upcomingMovies, ...rest } = useSwr({
    key: `/list_upcoming.json`
  })

  return { upcomingMovies, ...rest }
}
