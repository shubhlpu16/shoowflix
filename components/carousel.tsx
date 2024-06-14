import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { Navigation, Pagination } from 'swiper/modules'
import { Box, ResponsiveValue } from '@chakra-ui/react'
import Link from 'next/link'
import { useResponsive } from '@/hooks/useResponsive'

type Props = {
  movies: any
}

const Carousel = ({ movies }: Props) => {
  const { isMobile } = useResponsive()
  return (
    <Swiper
      slidesPerView={isMobile ? 3 : 6}
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
          slug: string
          year: any
          largeCoverImage: ResponsiveValue<string | (string & {})> | undefined
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
                backgroundImage={movie.largeCoverImage}
                h="100%"
                backgroundPosition="center"
                backgroundSize="cover"
                // backgroundRepeat="no-repeat"
              />
            </Link>
          </SwiperSlide>
        )
      )}
    </Swiper>
  )
}

export default Carousel
