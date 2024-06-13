import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import Link from 'next/link'
import { Autoplay } from 'swiper/modules'
import { Badge, Button, Flex, Heading, Text, VStack } from '@chakra-ui/react'
import { BsFillPlayFill } from 'react-icons/bs'

interface CarauselProps {
  movies: any[]
}

export function Caraousel({ movies }: CarauselProps) {
  const progressCircle = useRef(null)
  const progressContent = useRef(null)
  const onAutoplayTimeLeft = (s: any, time: number, progress: number) => {
    //@ts-ignore
    progressCircle.current.style.setProperty('--progress', 1 - progress)
    //@ts-ignore
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`
  }
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: true
        }}
        modules={[Autoplay]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >
        {movies?.map((movie, index) => {
          return (
            <SwiperSlide className="mask">
              <Flex
                backgroundImage={movie.backgroundImage}
                backgroundSize="cover"
                w="100%"
                h="100%"
                alignItems="center"
                backgroundPosition="center"
              >
                <VStack
                  key={movie.id}
                  alignItems="left"
                  textAlign="left"
                  width={{ xl: '45%', base: '80%' }}
                  gap="16px"
                  marginLeft={{ lg: '40px', base: '16px' }}
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
                  <Link passHref href={`movies/${movie.titleLong}`}>
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
            </SwiperSlide>
          )
        })}
        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </>
  )
}
