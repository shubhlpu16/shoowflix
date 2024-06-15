import React from 'react'
import { useMovies } from '@/data/use-movies'
import { Box, Heading } from '@chakra-ui/react'
import Carousel from './carousel'

interface MoviesListProps {
  genre: string
}

export const MoviesList = ({ genre }: MoviesListProps) => {
  const { moviesData } = useMovies({
    genre,
    limit: 20,
    sort_by: 'rating'
  })
  return (
    <Box>
      <Heading
        textShadow="2px 2px 4px rgba(0,0,0,.45)"
        color="white"
        fontSize="24px"
        mb="12px"
      >
        {genre}
      </Heading>
      <Carousel movies={moviesData?.movies} />
    </Box>
  )
}
