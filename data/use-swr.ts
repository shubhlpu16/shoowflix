import camelcaseKeys from 'camelcase-keys'
import { useMemo } from 'react'
import { SWRConfiguration } from 'swr'
import useSWRImmutable from 'swr/immutable'

export const fetcher = ([...args]) =>
  // @ts-ignore
  fetch(...args)
    .then((res) => res.json())
    .then((json) => camelcaseKeys(json, { deep: true }))

interface useSwrProps {
  key: string
  swrOptions?: SWRConfiguration
}

export const useSwr = ({ key, swrOptions }: useSwrProps) => {
  const config = {
    headers: {
      'X-Api-Key': process.env.NEXT_PUBLIC_API_KEY
    }
  }
  const url = `${process.env.NEXT_PUBLIC_API_ROOT}${key}`
  const swrKeyValue = [url, config]

  const { data, error, isLoading, isValidating, mutate } = useSWRImmutable(
    swrKeyValue,
    fetcher,
    swrOptions
  )

  const returnValue = useMemo(
    () => ({
      data,
      error,
      isLoading,
      isValidating,
      mutate
    }),
    [data, error, isLoading, isValidating, mutate]
  )

  return returnValue
}
