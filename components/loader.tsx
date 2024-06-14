import { Flex, Spinner } from '@chakra-ui/react'
import React from 'react'

export const Loader = () => {
  return (
    <Flex
      w="100%"
      h="calc(100% - 60px)"
      alignItems="center"
      justifyContent="center"
    >
      <Spinner color="red" thickness="3px" size="lg" />
    </Flex>
  )
}
