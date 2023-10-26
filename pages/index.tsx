import { Box, Stack } from '@chakra-ui/react'

import { Caraousel } from '@/components/caraousel'
import { useMovies } from '@/data/use-movies'
import { useMoviesData } from '@/hooks/use-movies-data'

export default function Home() {
  const { moviesData } = useMovies({
    limit: '4'
  })
  const { movies } = useMoviesData(moviesData)

  // eslint-disable-next-line no-console

  return (
    <>
      <Box>
        <Stack spacing={8} as="section" background="gray.600">
          <Caraousel movies={movies} />
        </Stack>
      </Box>
    </>
  )
}
