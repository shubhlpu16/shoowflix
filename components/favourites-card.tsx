import React from 'react'
import { useMoviesDetails } from '@/data/use-movies-details'
import { MovieCard } from './movie-card'

type Props = {
  id: string
}

export const FavouritesCard = ({ id }: Props) => {
  const { movieDetails: { data } = {} } = useMoviesDetails({ movie_id: id })

  const { movie } = data || {}

  if (!movie) {
    return null
  }

  return <MovieCard {...movie} />
}
