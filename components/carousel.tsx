import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { Navigation, Pagination } from 'swiper/modules'
import { Box, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { useResponsive } from '@/hooks/useResponsive'

type Props = {
  movies: any
}

const Carousel = ({ movies }: Props) => {
  const { isMobile } = useResponsive()
  return (
    <Swiper
      slidesPerView={isMobile ? 2 : 8}
      spaceBetween={10}
      slidesPerGroup={2}
      className="netflix-swiper"
      modules={[Pagination, Navigation]}
      pagination={{
        clickable: true
      }}
      navigation={true}
    >
      {movies.map(
        (movie: {
          mediumCoverImage: string
          title: string
          slug: string
          year: any
          largeCoverImage: string
          id: string
        }) => (
          <SwiperSlide className="carousel-slide" key={movie.id}>
            <Link
              passHref
              href={`movies/${movie.slug.replace(
                `${movie.year}`,
                `${movie?.id}`
              )}`}
            >
              <Box
                backgroundImage={
                  movie.largeCoverImage || movie.mediumCoverImage
                }
                h="300px"
                backgroundPosition="center"
                backgroundSize="cover"

                // backgroundRepeat="no-repeat"
              />
              <Text
                mt="12px"
                textAlign={{ base: 'center', xl: 'start' }}
                fontSize="14px"
                width="80%"
                noOfLines={2}
              >
                {movie.title}
              </Text>
            </Link>
          </SwiperSlide>
        )
      )}
    </Swiper>
  )
}

export default Carousel
