import { useMovies } from '@/data/use-movies'
import { Box, Stack } from '@chakra-ui/react'
import { Caraousel } from '@/components/caraousel'
import { useMemo } from 'react'
import { Navbar } from '@/components/navbar'

export default function Home() {
  const { moviesData } = useMovies({
    limit: '4'
  })

  // eslint-disable-next-line no-console
  const movies = useMemo(() => {
    return moviesData?.data?.movies?.map((movie: any) => movie) || []
  }, [moviesData])
  return (
    <Box>
      <Navbar />
      <Stack spacing={8} as="section" background="gray.600">
        <Caraousel movies={movies} />
      </Stack>
    </Box>
  )
}
