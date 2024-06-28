import {
  Stack,
  InputGroup,
  InputLeftElement,
  Input,
  List,
  ListItem,
  Text,
  useOutsideClick,
  Image
} from '@chakra-ui/react'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { Loader } from '@/components/loader'
import { useMovies } from '@/data/use-movies'
import { debounce } from 'lodash'

export const Search = () => {
  const [value, setValue] = useState('')
  const [search, setSearch] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const listRef = useRef<HTMLDivElement>(null)
  useOutsideClick({
    ref: listRef,
    handler: () => setIsOpen(false)
  })

  const { moviesData, isLoading } = useMovies(
    {
      limit: 5,
      query_term: search
    },
    !!search
  )

  useEffect(() => {
    const debouncedSearch = debounce(() => {
      setSearch(value)
    }, 300)
    debouncedSearch()
    return () => {
      debouncedSearch.cancel()
    }
  }, [value])

  const handleChange = (e: any) => {
    setValue(e.target.value)
  }
  return (
    <Stack
      direction={'column'}
      pos="relative"
      width={{ lg: '500px', base: '300px' }}
      ref={listRef}
    >
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <BsSearch color="gray.300" />
        </InputLeftElement>
        <Input
          placeholder="Search Movies"
          value={value}
          onChange={handleChange}
          onFocus={() => setIsOpen(true)}
          border="none"
          _focus={{
            borderBottom: '1px solid red'
          }}
          boxShadow="none !important"
          borderRadius="none"
          borderBottom="1px solid white"
        />
      </InputGroup>
      {isOpen && search !== '' && (
        <List
          pos="absolute"
          background="black"
          backdropFilter="brightness(0.2)"
          top="45px"
          width="100%"
          borderRadius="4px"
          padding="12px"
        >
          {isLoading && <Loader />}
          {moviesData.count === 0 && (
            <Text textAlign="center">No Movies Found</Text>
          )}
          {moviesData?.movies.map((movie: any) => {
            return (
              <Link
                key={movie.id}
                passHref
                href={`/movies/${movie.slug.replace(
                  `${movie.year}`,
                  `${movie?.id}`
                )}`}
              >
                <ListItem
                  h="100px"
                  display="flex"
                  alignItems="center"
                  gap="16px"
                  onClick={() => {
                    setIsOpen(false)
                    setSearch('')
                    setValue('')
                  }}
                >
                  <Image
                    src={movie.largeCoverImage}
                    width={50}
                    height={80}
                    alt={movie.title}
                    loading="lazy"
                  />
                  <Text noOfLines={2}>{movie.title}</Text>
                </ListItem>
              </Link>
            )
          })}
        </List>
      )}
    </Stack>
  )
}
