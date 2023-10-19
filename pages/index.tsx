// import { useTrendingMovies } from '@/data/use-trending-movies'
import { useMovies } from '@/data/use-movies'
import { Stack } from '@chakra-ui/react'

export default function Home() {
  const data = useMovies({ sort_by: 'date', order_by: 'desc' })
  // eslint-disable-next-line no-console
  console.log(data)
  return (
    <>
      <Stack>hi</Stack>
    </>
  )
}
