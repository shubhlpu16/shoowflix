import { useEffect, useRef, useState } from 'react'
import {
  Avatar,
  Box,
  Button,
  Fade,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Stack,
  useDisclosure,
  Text,
  VStack
} from '@chakra-ui/react'
import { BsFillPlayFill } from 'react-icons/bs'
import StarRatings from 'react-star-ratings'
import { useRouter } from 'next/router'
import { WebtorPlayer } from '@/components/webtor-player'
import { Loader } from '@/components/loader'
import { useMoviesDetails } from '@/data/use-movies-details'
import { useMoviesSuggestions } from '@/data/use-movies-suggestion'
import { useResponsive } from '@/hooks/useResponsive'
import { MovieCard } from '@/components/movie-card'

export default function Movie() {
  const router = useRouter()
  const { isMobile } = useResponsive()
  const {
    isReady,
    query: { slug }
  } = router
  //@ts-ignore
  const movieId = slug?.split('-').slice(-1)[0]

  const [torrentHash, setTorrentHash] = useState('')
  console.log('🚀 ~ Movie ~ torrentHash:', torrentHash)
  const [torrentUrl, setTorrentUrl] = useState('')
  const {
    movieDetails: { data } = {},
    isLoading,
    error
  } = useMoviesDetails({ movie_id: movieId, with_cast: true }, isReady)

  const { isOpen, onClose, onOpen } = useDisclosure()
  const modalRef = useRef(null)

  useEffect(() => {
    if (error) router.push('/404')
  }, [error, router])

  const { suggestedMoviesData } = useMoviesSuggestions(movieId, isReady)

  const isPageLoading = !isReady || isLoading

  const { movie } = data || {}

  if (isPageLoading) {
    return <Loader />
  }

  return (
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
          w={{ base: '100%', lg: '85%' }}
          h="100%"
          maxW="1440px"
          margin="0 auto"
          justifyContent={isPageLoading ? 'center' : 'start'}
          alignItems="center"
          p={{ base: '80px 16px 16px', lg: '80px 24px' }}
        >
          <Fade in={!isPageLoading}>
            <Grid
              gridTemplateColumns={{ base: '1fr', lg: '1fr 2fr' }}
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
                      rating={movie?.rating / 2 ?? 5}
                      starDimension="24px"
                      starSpacing="1px"
                      starRatedColor="#ffd700"
                    />
                    {movie?.rating}/10
                  </Flex>
                )}
                <Flex gap="24px" flexWrap="wrap">
                  {movie?.torrents.map((torrent: any) => (
                    <Button
                      colorScheme="red"
                      key={torrent.hash}
                      leftIcon={<BsFillPlayFill className="icon" />}
                      onClick={() => {
                        onOpen()
                        setTorrentHash(torrent.hash)
                        setTorrentUrl(torrent.url)
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
              {/* {torrentHash && (
                <WebtorPlayer
                  imdbId={movie?.imdbCode}
                  hash={torrentHash}
                  poster={movie?.largeCoverImage}
                  url={torrentUrl}
                />
              )} */}
              {movie?.cast?.length > 0 && (
                <>
                  <Heading
                    fontSize="24px"
                    borderBottom="2px solid red"
                    pb="4px"
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
                            <Text>{c.characterName}</Text>
                            <Text color="#9e9e9e" fontSize="14px">
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
                    pb="4px"
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
              <Heading fontSize="24px" borderBottom="2px solid red" pb="4px">
                Movies like this
              </Heading>
              <Stack
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
              </Stack>
            </Stack>
          </Fade>
        </Stack>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent
          w="100%"
          maxW={{ base: '80%', xl: '60%' }}
          minH={{ xl: '50%', base: '300px' }}
        >
          <ModalCloseButton />
          <ModalBody pt="24px" h="100%" background={'black'} ref={modalRef}>
            <WebtorPlayer
              imdbId={movie?.imdbCode}
              hash={torrentHash}
              poster={movie?.largeCoverImage}
              url={torrentUrl}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}
