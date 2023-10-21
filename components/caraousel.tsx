import {
  Box,
  BoxProps,
  Text,
  Button,
  VStack,
  Heading,
  Flex
} from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { BsFillPlayFill } from 'react-icons/bs'
import { AiOutlineInfoCircle } from 'react-icons/ai'

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
                  zIndex={10}
                >
                  <Heading
                    textShadow="2px 2px 4px rgba(0,0,0,.45)"
                    color="white"
                    fontSize="45px"
                  >
                    {movie.title}
                  </Heading>
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
                  <Flex gap="12px">
                    <Button
                      background="gray.0"
                      color="black"
                      variant="solid"
                      leftIcon={<BsFillPlayFill className="icon" />}
                    >
                      Play
                    </Button>
                    <Button
                      background="rgba(109, 109, 109, 0.7)"
                      color="gray.0"
                      leftIcon={
                        <AiOutlineInfoCircle
                          className="icon"
                          fill="white"
                          stroke="white"
                        />
                      }
                      padding="11px 28px"
                    >
                      More Info
                    </Button>
                  </Flex>
                </VStack>
              </Flex>
            </Box>
          )
        })}
      </Box>
    </>
  )
}
