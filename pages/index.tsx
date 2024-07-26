/* eslint-disable */
import { Box, Button, Heading, Stack } from '@chakra-ui/react'
import { SlideShow } from '@/components/slide-show'
import { useMovies } from '@/data/use-movies'
import Carousel from '@/components/carousel'
import { Loader } from '@/components/loader'
import { getRandomMovies } from '@/utils/get-random-movies'
import React from 'react'
import { MoviesList } from '../components/movies-list'
import { signIn } from 'next-auth/react'
import { SWRConfig } from 'swr'
import axios from 'axios'
import Head from 'next/head'

export default function Home({ fallback }: any) {
  const { moviesData, isLoading } = useMovies({
    limit: 10
  })

  const { moviesData: recentlyAdded } = useMovies({
    sort_by: 'year',
    limit: 20
  })

  const genres = [
    'Sci-Fi',
    'Comedy',
    'Action',
    'Adventure',
    'Crime',
    'Fantasy',
    'Mystery',
    'Drama',
    'Horror',
    'Romance',
    'War',
    'Thriller',
    'Animation'
  ]

  const randMovies = getRandomMovies(moviesData?.movies, 5)

  if (isLoading) {
    return <Loader />
  }

  return (
    // <SWRConfig value={{ fallback }}>
    <>
      <Head>
        <meta name="title" content="Shoowflix - Stream Movies" />
        <meta
          name="description"
          content="Torrent streaming website without ads "
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://shoowflix.vercel.app" />
        <meta property="og:title" content="Shoowflix - Stream Movies" />
        <meta
          property="og:description"
          content="Torrent streaming website without ads "
        />
        <meta
          property="og:image"
          content="https://shoowflix.vercel.app/background.png"
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://shoowflix.vercel.app" />
        <meta property="twitter:title" content="Shoowflix - Stream Movies" />
        <meta
          property="twitter:description"
          content="Torrent streaming website without ads "
        />
        <meta
          property="twitter:image"
          content="https://shoowflix.vercel.app/background.png"
        />
      </Head>
      <Stack
        as="section"
        gap="12px"
        background="gray.600"
        w="100%"
        h="100%"
        transform="translateY(-60px)"
      >
        <SlideShow movies={randMovies} />
        <Stack direction="column" w="100%" h="100%" padding="16px">
          <Box>
            <Heading
              textShadow="2px 2px 4px rgba(0,0,0,.45)"
              color="white"
              fontSize="24px"
              mb="12px"
            >
              Recently Added
            </Heading>
            <Carousel movies={recentlyAdded?.movies} />
          </Box>
          {genres.map((genre) => {
            return <MoviesList key={genre} genre={genre} />
          })}
        </Stack>
      </Stack>
    </>

    // </SWRConfig>
  )
}
// export async function getStaticProps() {
//   const { data: moviesData } = await axios.get(
//     'https://yts.mx/api/v2/list_movies.json?limit=10'
//   )
//   return {
//     props: {
//       fallback: {
//         '/api/v2/list_movies.json': moviesData.data
//       }
//     }
//   }
// }
