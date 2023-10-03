import React, { useEffect } from 'react'
import { Button, Flex, Stack } from '@chakra-ui/react'

import { useAppSelector, useAppDispatch } from '@/store/hooks'

import {
  decrement,
  increment,
  incrementByAmount,
  fetchCatalogue
} from '@/store/slices/counter-slice'

export default function Counter() {
  // The `state` arg is correctly typed as `RootState` already
  useEffect(() => {
    dispatch(fetchCatalogue())
  }, [])
  const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()

  return (
    <Stack w="100%" h="100%" spacing="8px" alignItems="center">
      <Flex gap="8px" w="100%" alignItems="center" justifyContent="center">
        <Button onClick={() => dispatch(decrement())}>-</Button>
        {count}
        <Button onClick={() => dispatch(increment())}>+</Button>
      </Flex>
      <Button w="200px" onClick={() => dispatch(incrementByAmount(2))}>
        +2
      </Button>
    </Stack>
  )
}
