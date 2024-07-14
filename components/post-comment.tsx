import { HStack, Avatar, Input, InputProps, BoxProps } from '@chakra-ui/react'
import { signIn, useSession } from 'next-auth/react'
import React, { forwardRef } from 'react'
import { getQueryParams } from '../utils/get-query-params'
import axios from 'axios'

export interface PostCommentProps {
  movieId: string
  placeholder: string
  mutateComments: () => void
  parentId?: string
  inputProps?: InputProps
  containerProps?: BoxProps
  ref?: any
}

const PostComment = forwardRef(
  (
    {
      movieId,
      mutateComments,
      parentId,
      placeholder,
      inputProps,
      containerProps
    }: PostCommentProps,
    ref
  ) => {
    const { data: session }: any = useSession()

    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        if (!session) {
          signIn()
          return
        }
        const text = e.currentTarget.value
        e.currentTarget.value = ''
        const reqUrl = getQueryParams(`/api/movies/${movieId}/comments`, {
          id: parentId as string
        })
        try {
          await axios.post(reqUrl, { text })
        } catch (error) {
          console.log(error)
        }
        mutateComments()
      }
    }
    return (
      <HStack {...containerProps} gap="12px" ref={ref}>
        <Avatar
          src={session?.user?.image}
          name={session?.user?.name}
          size="sm"
        />
        <Input
          placeholder={placeholder}
          size="sm"
          onKeyDown={handleKeyDown}
          {...inputProps}
        />
      </HStack>
    )
  }
)

export default PostComment
