import { Box, Button, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { useRouter } from 'next/router'

const NotFound = () => {
  const router = useRouter()
  return (
    <Stack
      alignItems="center"
      direction={'column'}
      justifyContent="center"
      w="100%"
      h="100%"
      spacing="24px"
    >
      <Text fontSize="18px" color="gray.100">
        404 | This page could not be found!
      </Text>
      <Button colorScheme="red" onClick={() => router.push('/')}>
        Go to Home
      </Button>
    </Stack>
  )
}

export default NotFound
