import { Box, Image, HStack } from '@chakra-ui/react'
import Link from 'next/link'
import { useScrollLimit } from '@/hooks/use-scroll-limit'

export const Navbar = () => {
  const limit = 20 // Change this value to set the scroll limit
  const hasScrolledPastLimit = useScrollLimit(limit)
  console.log('🚀 ~ Navbar ~ hasScrolledPastLimit:', hasScrolledPastLimit)
  return (
    <Box>
      <HStack
        h="60px"
        padding={{ lg: '16px 24px', base: '16px' }}
        position="sticky"
        width="100%"
        top={0}
        zIndex={100}
        as="header"
        backgroundColor={hasScrolledPastLimit ? 'black' : 'transparent'}
        // backgroundImage="linear-gradient(180deg,rgba(20,20,20,.7019607843137254) 10%,transparent)"
      >
        <Link passHref href="/">
          <Image src="/logo.png" alt="Logo" height="30px" cursor="pointer" />
        </Link>
      </HStack>
    </Box>
  )
}
