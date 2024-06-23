import { Image, HStack } from '@chakra-ui/react'
import Link from 'next/link'

import { Search } from '@/components/search'
import { AvatarMenu } from '@/components/avatar-menu'

export const Navbar = () => {
  // const limit = useScrollLimit(10)

  return (
    <HStack
      h="60px"
      padding={{ lg: '16px 24px', base: '16px' }}
      width="100%"
      top={0}
      zIndex={100}
      justifyContent="space-between"
      pos="relative"
      // pos="sticky"
      //@ts-ignore
      backgroundImage={
        'linear-gradient(180deg,rgba(20,20,20,.7019607843137254) 10%,transparent)'
      }
    >
      <HStack gap="24px">
        <Link passHref href="/">
          <Image src="/logo.png" alt="Logo" height="30px" cursor="pointer" />
        </Link>
        <Search />
      </HStack>
      <AvatarMenu />
    </HStack>
  )
}
