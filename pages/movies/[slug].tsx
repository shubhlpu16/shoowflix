import { useEffect, useState } from 'react'
import { useMovies } from '@/data/use-movies'
import { useMoviesData } from '@/hooks/use-movies-data'
import {
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
  Spinner,
  Stack,
  Text
} from '@chakra-ui/react'
import { BsFillPlayFill } from 'react-icons/bs'
import StarRatings from 'react-star-ratings'
import { useRouter } from 'next/router'
import { WebtorPlayer } from '@/components/webtor-player'

export default function Movie() {
  const router = useRouter()
  const {
    isReady,
    query: { slug }
  } = router

  const [torrentHash, setTorrentHash] = useState('')

  const { moviesData, isLoading } = useMovies(
    { query_term: slug as string },
    isReady
  )

  const isPageLoading = !isReady || isLoading

  const { movies, count } = useMoviesData(moviesData)

  // useEffect(() => {
  //   if (!isLoading && (count === 0 || count > 1)) {
  //     router.push('/404')
  //   }
  // }, [count, isLoading, router])

  return (
    <Box
      backgroundImage={movies[0]?.backgroundImage}
      height="100%"
      width="100%"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      pos="absolute"
      top={0}
    >
      <Box backdropFilter="brightness(0.2)" h="100%" overflow="auto">
        <Stack
          w={{ base: '100%', lg: '85%' }}
          h="100%"
          maxW="1440px"
          margin="0 auto"
          justifyContent={isPageLoading ? 'center' : 'start'}
          alignItems="center"
          p={{ base: '80px 16px', lg: '80px 24px' }}
        >
          {isPageLoading && <Spinner color="red" thickness="3px" size="lg" />}
          {!isPageLoading && (
            <Fade in={!isPageLoading}>
              <Grid
                gridTemplateColumns={{ base: '1fr', lg: '1fr 2fr' }}
                gap="24px"
                placeItems={{ base: 'center', lg: 'initial' }}
              >
                <GridItem>
                  <Image
                    src={movies[0]?.largeCoverImage}
                    h={{ lg: '500px', base: '350px' }}
                    w="333px"
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
                    {movies[0]?.title}
                  </Heading>
                  <Text fontSize="18px">{movies[0]?.year}</Text>
                  <Text fontSize="18px">{movies[0]?.genres.join(' / ')}</Text>
                  <Text fontSize="18px">{movies[0]?.runtime} min</Text>
                  {movies[0]?.rating && (
                    <Flex gap="8px" alignItems="center">
                      <StarRatings
                        rating={movies[0]?.rating / 2 ?? 5}
                        starDimension="24px"
                        starSpacing="1px"
                        starRatedColor="#ffd700"
                      />
                      {movies[0]?.rating}/10
                    </Flex>
                  )}
                  <Flex gap="24px">
                    {movies[0]?.torrents.map((torrent: any) => (
                      <Button
                        colorScheme="red"
                        key={torrent.hash}
                        leftIcon={<BsFillPlayFill className="icon" />}
                        onClick={() => setTorrentHash(torrent.hash)}
                      >
                        Play {torrent.quality}
                      </Button>
                    ))}
                  </Flex>
                  {movies[0]?.summary && (
                    <Text
                      fontSize="16px"
                      fontStyle="italic"
                      fontWeight={400}
                      noOfLines={10}
                    >
                      Summary: {movies[0]?.summary}
                    </Text>
                  )}
                </GridItem>
              </Grid>
              <Stack gap="24px" mt={{ base: '24px', xl: '40px' }}>
                <Heading fontSize="24px" borderBottom="2px solid red" pb="4px">
                  Trailers & More
                </Heading>
                <iframe
                  width="600"
                  height="400"
                  src={`https://www.youtube.com/embed/${movies[0]?.ytTrailerCode}`}
                  title={`${movies[0].title} - Trailer`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </Stack>
            </Fade>
          )}
        </Stack>
      </Box>
      <Modal
        isOpen={!!torrentHash}
        onClose={() => setTorrentHash('')}
        size="4xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody p="0" minH="400px" background={'black'}>
            <WebtorPlayer
              imdbId={movies[0]?.imdbCode}
              hash={torrentHash}
              poster={movies[0]?.largeCoverImage}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}
