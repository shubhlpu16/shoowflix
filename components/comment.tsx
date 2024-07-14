import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Stack,
  useBoolean,
  Text,
  VStack
} from '@chakra-ui/react'
import { formatDistanceToNow } from 'date-fns'
import { BiSolidUpvote, BiSolidDownvote } from 'react-icons/bi'
import { BsFillReplyFill } from 'react-icons/bs'
import PostComment from '@/components/post-comment'
import axios from 'axios'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

export interface CommentProps {
  comment: any
  mutateComments: () => void
  movieId: string
  index?: number
}

export const Comment = ({ comment, mutateComments, movieId }: CommentProps) => {
  const [isReplying, setIsReplying] = useBoolean()
  const replyRef = useRef<HTMLDivElement>()

  useEffect(() => {
    setIsReplying.off()
  }, [comment, setIsReplying])

  useEffect(() => {
    if (replyRef.current) {
      replyRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [isReplying])

  const handleClick = async (type: 'upVotes' | 'downVotes') => {
    const reqUrl = `/api/movies/${movieId}/comments?id=${comment.id}`
    await axios.put(reqUrl, { [type]: comment[type] + 1 })
    mutateComments()
  }

  return (
    <>
      <Flex gap="24px">
        <Link passHref href={`/profile/${comment.userId}`}>
          <Avatar
            src={comment.commentedBy.image}
            name={comment.commentedBy.name}
            size="sm"
          />
        </Link>
        <VStack alignItems="start">
          <Flex gap="6px" alignItems="center">
            <Text
              fontSize="14px"
              color="gray.100"
              as={Link}
              passHref
              href={`/profile/${comment.userId}`}
            >
              {comment.commentedBy.name}
            </Text>
            <Text fontSize="12px" color="gray.300">
              •
            </Text>
            <Text fontSize="12px" color="gray.300">
              {formatDistanceToNow(comment.createdAt, {
                includeSeconds: true,
                addSuffix: true
              })}
            </Text>
          </Flex>
          <span>{comment.text}</span>
          <HStack
            alignItems="center"
            color="gray.500"
            userSelect="none"
            gap="12px"
          >
            <Flex
              gap="1px"
              alignItems="center"
              cursor="pointer"
              onClick={() => handleClick('upVotes')}
              title="UpVotes"
            >
              <BiSolidUpvote />
              <Text fontSize="12px" color="gray.500">
                {comment.upVotes}
              </Text>
            </Flex>
            <Flex
              gap="1px"
              alignItems="center"
              cursor="pointer"
              onClick={() => handleClick('downVotes')}
              title="DownVotes"
            >
              <BiSolidDownvote />
              <Text fontSize="12px" color="gray.500">
                {comment.downVotes}
              </Text>
            </Flex>
            <Flex
              gap="1px"
              alignItems="center"
              cursor="pointer"
              onClick={() => setIsReplying.toggle()}
            >
              <BsFillReplyFill />
              <Text fontSize="12px" color="gray.500">
                Reply
              </Text>
            </Flex>
          </HStack>

          <PostComment
            mutateComments={mutateComments}
            placeholder="Add a reply"
            movieId={movieId}
            parentId={comment.parentId || comment.id}
            containerProps={{
              m: '16px 0',
              display: isReplying ? 'flex' : 'none'
            }}
            ref={replyRef}
          />
        </VStack>
      </Flex>

      {comment.replies?.length > 0 && (
        <Stack mt="8px" ml="28px">
          <Accordion allowToggle reduceMotion>
            <AccordionItem width="max-content" border="none">
              <AccordionButton
                colorScheme="blue"
                as={Button}
                padding={0}
                fontSize="14px"
                width="max-content"
                variant="link"
                justifyContent="start"
                border="none"
              >
                <AccordionIcon />
                <Box as="span" textAlign="left">
                  Replies
                </Box>
              </AccordionButton>
              <AccordionPanel as={VStack} gap="12px" alignItems="start">
                {comment.replies.map((reply: any) => (
                  <Comment
                    key={reply.id}
                    comment={reply}
                    mutateComments={mutateComments}
                    movieId={movieId}
                  />
                ))}
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Stack>
      )}
    </>
  )
}
