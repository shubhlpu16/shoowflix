import { useEffect, useRef } from 'react'
import {
  Avatar,
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
  VStack,
  useDisclosure,
  useToast
} from '@chakra-ui/react'
import { BsFillPlayFill } from 'react-icons/bs'
import StarRatings from 'react-star-ratings'
import { useRouter } from 'next/router'
import { WebtorPlayer } from '@/components/webtor-player'
import { Loader } from '@/components/loader'
import { useMoviesDetails } from '@/data/use-movies-details'
import { useMoviesSuggestions } from '@/data/use-movies-suggestion'
import { useResponsive } from '@/hooks/useResponsive'
// import { MovieCard } from '@/components/movie-card'
import { play } from '@/utils/play'
import axios from 'axios'
import useSWR from 'swr'
import { fetcher } from '@/data/use-swr'
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md'
import { signIn, useSession } from 'next-auth/react'
import Carousel from '@/components/carousel'
import { CommentsTree } from '@/components/comments-tree'
import Head from 'next/head'
import { generateMetaData } from '@/utils/generate-metadata'

export default function Movie() {
  const router = useRouter()
  const { isMobile } = useResponsive()
  const {
    isReady,
    query: { slug }
  } = router
  const { data: session } = useSession()
  //@ts-ignore
  const movieId = slug?.split('-').slice(-1)[0]

  const { isOpen, onOpen, onClose } = useDisclosure()

  const {
    movieDetails: { data } = {},
    isLoading,
    error
  } = useMoviesDetails({ movie_id: movieId, with_cast: true }, isReady)

  const { data: { isFavourite } = {}, mutate } = useSWR(
    () => (movieId ? [`/api/movies/${movieId}/check-favourite`] : null),
    fetcher
  )

  const toast = useToast()
  const playerRef = useRef(null)

  useEffect(() => {
    if (error) router.push('/404')
  }, [error, router])

  const { suggestedMoviesData } = useMoviesSuggestions(movieId, isReady)

  const isPageLoading = !isReady || isLoading

  const { movie } = data || {}

  const handleToggleFavourite = async () => {
    try {
      if (!session) {
        signIn()
        return
      }
      await axios.post(`/api/movies/${movieId}/favourite`)
      toast({
        title: isFavourite ? 'Removed from favourites' : 'Added to favourites',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top',
        colorScheme: 'red'
      })
      mutate({ isFavourite: true })
    } catch (error) {
      toast({
        title: isFavourite ? 'Error removing movie' : 'Error adding movie',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top',
        colorScheme: 'red'
      })
    }
  }

  if (isPageLoading) {
    return <Loader />
  }

  const metaData: any = movie ? generateMetaData(movie) : {}

  return (
    // <SWRConfig value={{ fallback }}>
    <>
      {' '}
      <Head>
        <title>{metaData.title}</title>
        <meta name="description" content={metaData.description} />
        <meta name="keywords" content={metaData.keywords} />
        <meta property="og:title" content={metaData.ogTitle} />
        <meta property="og:description" content={metaData.ogDescription} />
        <meta property="og:image" content={metaData.ogImage} />
        <meta name="twitter:card" content={metaData.twitterCard} />
        <meta name="twitter:title" content={metaData.twitterTitle} />
        <meta
          name="twitter:description"
          content={metaData.twitterDescription}
        />
        <meta name="twitter:image" content={metaData.twitterImage} />
      </Head>
      <Box
        backgroundImage={movie?.backgroundImage}
        pos={'absolute'}
        top="-60px"
        width="100%"
        minH="100vh"
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
      >
        <Box
          backdropFilter="brightness(0.2)"
          minHeight="100vh"
          paddingTop="120px"
          height="max-content"
        >
          <Stack
            w={{ base: '100%' }}
            h="100%"
            // maxW="1440px"
            // margin="0 auto"
            justifyContent={isPageLoading ? 'center' : 'start'}
            p={{ base: '80px 16px 16px', lg: '80px 24px' }}
          >
            <Grid
              gridTemplateColumns={{ base: '1fr', lg: '400px 2fr' }}
              gap="24px"
              placeItems={{ base: 'center', lg: 'initial' }}
            >
              <GridItem>
                <Image
                  src={movie?.largeCoverImage}
                  h={{ lg: '500px', base: '350px' }}
                  w={{ base: '200px', xl: '300px' }}
                  border="6px solid white"
                  borderRadius="8px"
                  alt={slug as string}
                  fallbackSrc="https://via.placeholder.com/150"
                  loading="lazy"
                />
              </GridItem>
              <GridItem as={Stack} spacing="24px">
                <Heading
                  textShadow="2px 2px 4px rgba(0,0,0,.45)"
                  color="white"
                  fontSize={{ lg: '45px', base: '24px' }}
                >
                  {movie?.title}
                </Heading>
                <Text fontSize="18px">{movie?.year}</Text>
                <Text fontSize="18px">{movie?.genres.join(' / ')}</Text>
                <Text fontSize="18px">{movie?.runtime} min</Text>
                {movie?.rating && (
                  <Flex gap="8px" alignItems="center">
                    <StarRatings
                      rating={movie?.rating ? movie.rating / 2 : 5}
                      starDimension="24px"
                      starSpacing="1px"
                      starRatedColor="#ffd700"
                    />
                    {movie?.rating}/10
                  </Flex>
                )}
                <Icon
                  as={isFavourite ? MdFavorite : MdFavoriteBorder}
                  boxSize="44px"
                  onClick={handleToggleFavourite}
                  sx={{ cursor: 'pointer' }}
                  color={isFavourite ? 'red' : 'white'}
                ></Icon>
                <Flex gap="24px" flexWrap="wrap">
                  {movie?.torrents.map((torrent: any) => (
                    <Button
                      colorScheme="red"
                      key={torrent.hash}
                      leftIcon={<BsFillPlayFill className="icon" />}
                      onClick={() => {
                        if (!session) {
                          signIn()
                          return
                        }
                        onOpen()
                        // if (playerRef.current) {
                        //   //@ts-ignore
                        //   playerRef.current?.load(
                        //     torrent.hash,
                        //     torrent.url,
                        //     movie?.imdbCode,
                        //     movie?.largeCoverImage
                        //   )
                        // }
                        setTimeout(() => {
                          play(
                            torrent.hash,
                            movie?.imdbCode,
                            movie?.largeCoverImage,
                            torrent.url
                          )
                        }, 100)
                      }}
                    >
                      Play {torrent.quality}
                    </Button>
                  ))}
                </Flex>
                {movie?.descriptionFull && (
                  <Text
                    fontSize="16px"
                    fontStyle="italic"
                    letterSpacing="1px"
                    fontWeight={400}
                    noOfLines={10}
                  >
                    Plot: {movie?.descriptionFull}
                  </Text>
                )}
              </GridItem>
            </Grid>

            <Stack gap="24px" mt={{ base: '24px', xl: '40px' }} w="100%">
              {/*  <WebtorPlayer ref={playerRef} /> */}
              {movie?.cast?.length > 0 && (
                <>
                  <Heading
                    fontSize="24px"
                    borderBottom="2px solid red"
                    pb="16px"
                  >
                    Casts
                  </Heading>
                  <Stack
                    direction="row"
                    spacing="32px"
                    mb="24px"
                    flexWrap="wrap"
                    justifyContent={{ base: 'center', xl: 'start' }}
                  >
                    {movie?.cast?.map(
                      (c: {
                        name: string
                        urlSmallImage: string | undefined
                        characterName: string
                      }) => {
                        return (
                          <VStack spacing="2px" key={c.characterName}>
                            <Avatar size="xl" src={c.urlSmallImage} />
                            <Text width="100%" noOfLines={2} textAlign="center">
                              {c.characterName}
                            </Text>
                            <Text
                              width="90%"
                              color="#9e9e9e"
                              fontSize="14px"
                              noOfLines={2}
                              textAlign="center"
                            >
                              {c.name}
                            </Text>
                          </VStack>
                        )
                      }
                    )}
                  </Stack>
                </>
              )}
              {movie?.ytTrailerCode && (
                <>
                  <Heading
                    fontSize="24px"
                    borderBottom="2px solid red"
                    pb="16px"
                  >
                    Trailers & More
                  </Heading>
                  <iframe
                    width={isMobile ? '100%' : '600'}
                    height={isMobile ? '300' : '400'}
                    src={`https://www.youtube.com/embed/${movie.ytTrailerCode}`}
                    title={`${movie.title} - Trailer`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                </>
              )}
              <Heading fontSize="24px" borderBottom="2px solid red" pb="16px">
                Movies like this
              </Heading>
              <Carousel movies={suggestedMoviesData.movies} />
              <Heading fontSize="24px" borderBottom="2px solid red" pb="16px">
                Comments
              </Heading>
              {movieId && !isLoading && <CommentsTree movieId={movieId} />}
              {/* <Stack
                direction="row"
                flexWrap="wrap"
                gap="24px"
                justifyContent={{ base: 'center', xl: 'start' }}
              >
                {suggestedMoviesData.movies.map(
                  (movie: {
                    mediumCoverImage: string
                    largeCoverImage: string
                    title: string
                    slug: string
                    year: string
                    id: string
                  }) => (
                    <Box key={movie.id}>
                      <MovieCard {...movie} />
                    </Box>
                  )
                )}
              </Stack> */}
            </Stack>
          </Stack>
        </Box>
        <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
          <ModalOverlay />
          <ModalContent
            w="100%"
            maxW={{ base: '90%', xl: '768px' }}
            minH="321px"
          >
            <ModalCloseButton zIndex={2} />
            <ModalBody pt="24px" h="100%" background={'black'}>
              <WebtorPlayer ref={playerRef} />
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
      {/* </SWRConfig> */}
    </>
  )
}

// export const getServerSideProps = async (context: any) => {
//   const { params } = context
//   const { slug } = params
//   const movieId = slug?.split('-').slice(-1)[0]
//   try {
//     const res = await axios.get(
//       `https://yts.mx/api/v2/movie_details.json?movie_id=${movieId}&with_cast=true`
//     )
//     const { data } = res
//     const { movie } = data.data || {}
//     return {
//       props: {
//         fallback: {
//           'v2/movie_details.json': camelcaseKeys(movie, { deep: true })
//         }
//       }
//     }
//   } catch (error) {
//     return {
//       props: {
//         fallback: {}
//       }
//     }
//   }
// }
