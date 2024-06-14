import { Image, HStack } from '@chakra-ui/react'
import Link from 'next/link'

export const Navbar = () => {
  return (
    <HStack
      h="60px"
      padding={{ lg: '16px 24px', base: '16px' }}
      width="100%"
      top={0}
      zIndex={100}
      pos="relative"
      // backgroundImage="linear-gradient(180deg,rgba(20,20,20,.7019607843137254) 10%,transparent)"
    >
      <Link passHref href="/">
        <Image src="/logo.png" alt="Logo" height="30px" cursor="pointer" />
      </Link>
    </HStack>
  )
}
