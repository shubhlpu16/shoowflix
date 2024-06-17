import { Box, Text } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'

interface MovieCardProps {
  slug: string
  year: string
  id: string
  largeCoverImage: string
  mediumCoverImage: string
  title: string
  className?: string
}

export const MovieCard = ({
  slug,
  year,
  id,
  largeCoverImage,
  mediumCoverImage,
  title,
  className = ''
}: MovieCardProps) => {
  return (
    <Link passHref href={`/movies/${slug.replace(`${year}`, `${id}`)}`}>
      <Box
        backgroundImage={largeCoverImage || mediumCoverImage}
        h="300px"
        maxW="250px"
        w="100%"
        backgroundPosition="center"
        backgroundSize="cover"
        className={className}

        // backgroundRepeat="no-repeat"
      />
      <Text
        mt="12px"
        textAlign={{ base: 'center', xl: 'start' }}
        fontSize="14px"
        width="200px"
        noOfLines={2}
      >
        {title}
      </Text>
    </Link>
  )
}
