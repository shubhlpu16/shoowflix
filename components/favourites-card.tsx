import React from 'react'
import { useMoviesDetails } from '@/data/use-movies-details'
import { MovieCard } from './movie-card'
import { Box, Skeleton, SkeletonText } from '@chakra-ui/react'

type Props = {
  id: string
}

export const FavouritesCard = ({ id }: Props) => {
  const { movieDetails: { data } = {}, isLoading } = useMoviesDetails({
    movie_id: id
  })

  const { movie } = data || {}

  if (!movie && isLoading) {
    return (
      <Box boxShadow="lg">
        <Skeleton height="280px" />
        <SkeletonText mt="4" noOfLines={1} spacing="4" skeletonHeight="2" />
      </Box>
    )
  }

  return <MovieCard {...movie} />
}
