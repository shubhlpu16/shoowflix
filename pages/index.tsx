import { Box, Heading, Stack } from '@chakra-ui/react'

import { SlideShow } from '@/components/slide-show'
import { useMovies } from '@/data/use-movies'
import { useMoviesData } from '@/hooks/use-movies-data'
import Carousel from '@/components/carousel'
import { Loader } from '@/components/loader'
import { getRandomMovies } from '@/utils/get-random-movies'

export default function Home() {
  const { moviesData, isLoading } = useMovies({
    limit: '10'
  })
  const { movies } = useMoviesData(moviesData)

  const randMovies = getRandomMovies(movies, 5)

  // eslint-disable-next-line no-console
  if (isLoading) {
    return <Loader />
  }

  return (
    <Stack
      as="section"
      gap="12px"
      background="gray.600"
      w="100%"
      h="100%"
      transform="translateY(-60px)"
    >
      <SlideShow movies={randMovies} />
      <Box w="100%" h="100%" padding="24px">
        <Heading
          textShadow="2px 2px 4px rgba(0,0,0,.45)"
          color="white"
          fontSize="24px"
        >
          Upcoming
        </Heading>
        <Carousel movies={movies} />
      </Box>
    </Stack>
  )
}
