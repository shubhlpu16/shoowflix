import React from 'react'
import useSWR from 'swr'
import { fetcher } from '@/data/use-swr'
import { Stack, VStack, Text, Button } from '@chakra-ui/react'
import { Comment } from '@/components/comment'
import PostComment from '@/components/post-comment'
import { signIn, useSession } from 'next-auth/react'

interface CommentsTreeProps {
  movieId: string
}

export const CommentsTree = ({ movieId }: CommentsTreeProps) => {
  const { data: { comments } = {}, mutate: mutateComments } = useSWR(
    () => (movieId ? [`/api/movies/${movieId}/comments`] : null),
    fetcher
  )
  const { data: session } = useSession()

  return (
    <Stack direction="column" spacing="12px">
      {session && (
        <PostComment
          placeholder="Add a comment"
          movieId={movieId}
          mutateComments={mutateComments}
          inputProps={{ w: { base: 'calc(100% - 48px)', lg: '500px' } }}
          containerProps={{ mb: '48px' }}
        />
      )}
      {!session && (
        <VStack gap="24px">
          <Text fontSize="18px">You need to sign in to comment!</Text>
          <Button onClick={() => signIn()} colorScheme="red">
            Sign in
          </Button>
        </VStack>
      )}
      {comments?.length > 0 &&
        comments?.map((comment: any, index: number) => (
          <Comment
            key={comment.id}
            index={index}
            movieId={movieId}
            comment={comment}
            mutateComments={mutateComments}
          />
        ))}
      {comments?.length === 0 && (
        <Text fontSize="18px" textAlign="center">
          No comments yet!
        </Text>
      )}
    </Stack>
  )
}
