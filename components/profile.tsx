import {
  Avatar,
  Stack,
  VStack,
  Text,
  Heading,
  Grid,
  GridItem,
  Flex
} from '@chakra-ui/react'
import React from 'react'
import { FavouritesCard } from '@/components/favourites-card'

export interface ProfileProps {
  user: {
    name: string
    email: string
    image: string
  }
  movieIds: string[]
}

export const Profile = ({ user, movieIds }: ProfileProps) => {
  return (
    <Stack
      direction="column"
      h="100%"
      w="100%"
      padding={{ lg: '16px 24px', base: '16px' }}
    >
      <VStack alignItems="start">
        <Heading
          textShadow="2px 2px 4px rgba(0,0,0,.45)"
          color="white"
          fontSize="24px"
          mb="12px"
        >
          Profile
        </Heading>
        <Flex alignItems="center">
          <Avatar name={user?.name || ''} src={user?.image || ''} size="xl" />
          <VStack ml="12px" alignItems="start">
            <Text color="white" fontSize="16px">
              Name: {user?.name}
            </Text>
            <Text color="white" fontSize="16px">
              Email: {user?.email}
            </Text>
          </VStack>
        </Flex>
      </VStack>
      <Heading
        textShadow="2px 2px 4px rgba(0,0,0,.45)"
        color="white"
        fontSize="24px"
        mb="12px"
        mt="6rem"
        borderBottom="2px solid red"
        pb="16px"
      >
        Favourites
      </Heading>
      <Grid
        gap="10px"
        gridTemplateColumns={{
          base: 'repeat(auto-fit,174px)',
          xl: 'repeat(auto-fit,200px)'
        }}
      >
        {movieIds?.map((id: string) => (
          <GridItem key={id}>
            <FavouritesCard id={id} />
          </GridItem>
        ))}
      </Grid>
      {movieIds?.length === 0 && (
        <Text color="white" mt="24px" textAlign={'center'}>
          No favourites yet!
        </Text>
      )}
    </Stack>
  )
}
