import { Box, Image, HStack } from '@chakra-ui/react'

export const Navbar = () => {
  return (
    <Box>
      <HStack
        h="60px"
        padding="16px 24px"
        position="sticky"
        width="100%"
        top={0}
        zIndex={100}
        as="header"
        backgroundImage="linear-gradient(180deg,rgba(20,20,20,.7019607843137254) 10%,transparent)"
      >
        <Image src="/logo.png" alt="Logo" height="100%" />
      </HStack>
    </Box>
  )
}
