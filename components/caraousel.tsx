import styled from '@emotion/styled'
import { Box, BoxProps, Image } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'

interface CarauselProps {
  images: string[]
  sliderProps?: BoxProps
  slideProps?: BoxProps
}

const MaskImage = styled(Image)`
  -webkit-mask-image: linear-gradient(to bottom, #141414 36%, transparent);
  mask-image: linear-gradient(to bottom, #141414 36%, transparent);
`

export const Caraousel = ({
  images,
  sliderProps,
  slideProps
}: CarauselProps) => {
  const [currSlide, setCurrSlide] = useState(0)
  const sliderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    sliderRef?.current?.childNodes?.forEach((slide: any, index) => {
      slide.style.transform = `translateX(${100 * (index - currSlide)}%)`
    })
  }, [currSlide])

  useEffect(() => {
    const autoSlideInterval = setInterval(() => {
      handleNext()
    }, 3000)

    return () => {
      clearInterval(autoSlideInterval)
    }
  }, [])

  const handleNext = () => {
    setCurrSlide((prevSlide) =>
      prevSlide === images.length - 1 ? 0 : prevSlide + 1
    )
  }

  // const handlePrev = () => {
  //   setCurrSlide((prevSlide) =>
  //     prevSlide === 0 ? images.length - 1 : prevSlide - 1
  //   )
  // }

  return (
    <>
      <Box
        w="100%"
        height="80vh"
        ref={sliderRef}
        overflow="hidden"
        {...sliderProps}
      >
        {images?.map((image: string, index: number) => {
          return (
            <Box
              width="100%"
              height="80vh"
              position="absolute"
              top={0}
              transition="all 0.3s ease-in"
              key={`image-slide-show-${index}`}
              {...slideProps}
            >
              <MaskImage
                src={image}
                objectFit="fill"
                w="100%"
                h="100%"
                alt={`hero-${index}`}
              />
            </Box>
          )
        })}
      </Box>
    </>
  )
}
