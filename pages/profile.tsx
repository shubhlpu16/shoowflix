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
import { useSession } from 'next-auth/react'
import React from 'react'
import useSWR from 'swr'
import { fetcher } from '../data/use-swr'
import { FavouritesCard } from '../components/favourites-card'
import { Loader } from '../components/loader'

const Profile = () => {
  const { data: session } = useSession()
  const { data: { movieIds } = {}, isLoading } = useSWR(
    [`/api/favourite`],
    fetcher
  )

  if (isLoading) {
    return <Loader />
  }
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
          <Avatar
            name={session?.user?.name || ''}
            src={session?.user?.image || ''}
            size="xl"
          />
          <VStack ml="12px" alignItems="start">
            <Text color="white" fontSize="16px">
              Name: {session?.user?.name}
            </Text>
            <Text color="white" fontSize="16px">
              Email: {session?.user?.email}
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
    </Stack>
  )
}

export default Profile
