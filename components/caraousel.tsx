import {
  Box,
  BoxProps,
  Text,
  Button,
  VStack,
  Heading,
  Flex,
  Badge
} from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { BsFillPlayFill } from 'react-icons/bs'
import Link from 'next/link'

interface CarauselProps {
  movies: any[]
  sliderProps?: BoxProps
  slideProps?: BoxProps
}

export const Caraousel = ({
  movies,
  sliderProps,
  slideProps
}: CarauselProps) => {
  const [currSlide, setCurrSlide] = useState(0)
  const sliderRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<any>(null)

  useEffect(() => {
    sliderRef?.current?.childNodes?.forEach((slide: any, index) => {
      slide.style.transform = `translateX(${100 * (index - currSlide)}%)`
    })
  }, [currSlide])

  const autoSlider = () => {
    intervalRef.current = setInterval(() => {
      handleNext()
    }, 3000)
  }

  useEffect(() => {
    autoSlider()

    return () => {
      clearInterval(intervalRef.current)
    }
  }, [movies])

  const handleNext = () => {
    setCurrSlide((prevSlide) =>
      prevSlide === movies.length - 1 ? 0 : prevSlide + 1
    )
  }

  return (
    <>
      <Box
        w="100%"
        height="80vh"
        ref={sliderRef}
        overflow="hidden"
        onMouseEnter={() => clearInterval(intervalRef.current)}
        onMouseLeave={autoSlider}
        {...sliderProps}
      >
        {movies?.map((movie, index) => {
          return (
            <Box
              width="100%"
              height="80vh"
              position="absolute"
              top={0}
              transition="all 0.3s ease-in"
              key={`image-slide-show-${movie.id}`}
              {...slideProps}
            >
              <Flex
                className="mask"
                backgroundImage={movie.largeCoverImage}
                backgroundSize="cover"
                w="100%"
                h="100%"
                alignItems="center"
                opacity={index === currSlide ? 1 : 0}
                transition="all 0.3s ease-in"
                backgroundPosition="center"
              >
                <VStack
                  key={movie.id}
                  alignItems="left"
                  width={{ xl: '35%', base: '100%' }}
                  spacing="12px"
                  marginLeft={{ lg: '40px', base: '16px' }}
                  // zIndex={10}
                  // padding="12px"
                  // borderRadius="12px"
                  // backdropFilter="blur(10px)" /* Adjust the blur amount as needed */
                  // backgroundColor=" rgba(255, 255, 255, 0.5)" /* Adjust the color and opacity */
                >
                  <Heading
                    textShadow="2px 2px 4px rgba(0,0,0,.45)"
                    color="white"
                    fontSize="45px"
                  >
                    {movie.title}
                  </Heading>
                  <Text>{movie.year}</Text>
                  <Text fontSize="18px">
                    Genres: {movie.genres.join(' / ')}
                  </Text>
                  <Text fontSize="18px">{movie.runtime} min</Text>
                  <Flex fontSize="18px" gap="8px">
                    <Text>Available in</Text>
                    {movie.torrents.map((torrent: any) => (
                      <Badge
                        textShadow="none"
                        color="black"
                        alignItems="center"
                        display="flex"
                        key={torrent.hash}
                      >
                        {torrent.quality}
                      </Badge>
                    ))}
                  </Flex>
                  <Text fontSize="18px">Imdb Rating {movie.rating}</Text>
                  <Text
                    textShadow="2px 2px 4px rgba(0,0,0,.45)"
                    color="white"
                    noOfLines={3}
                    fontSize="21px"
                    fontWeight="500"
                    lineHeight="120%"
                  >
                    {movie.synopsis}
                  </Text>
                  <Link passHref href={`/${movie.slug}`}>
                    <Button
                      background="gray.0"
                      color="black"
                      variant="solid"
                      leftIcon={<BsFillPlayFill className="icon" />}
                    >
                      Play
                    </Button>
                  </Link>
                </VStack>
              </Flex>
            </Box>
          )
        })}
      </Box>
    </>
  )
}
