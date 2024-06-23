import { Menu, MenuButton, Avatar, MenuList, MenuItem } from '@chakra-ui/react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React from 'react'

export const AvatarMenu = () => {
  const { data: session } = useSession()
  const router = useRouter()
  return (
    <Menu>
      <MenuButton
        transition="all 0.2s"
        background="transparent"
        onClick={() => {
          if (!session) {
            signIn()
          }
        }}
      >
        <Avatar
          size="sm"
          name={session?.user?.name || ''}
          src={session?.user?.image || ''}
        />
      </MenuButton>
      {session && (
        <MenuList background="black" border="none">
          <MenuItem
            backgroundColor="black"
            onClick={() => router.push('/profile')}
          >
            Profile
          </MenuItem>
          <MenuItem backgroundColor="black" onClick={() => signOut()}>
            Logout
          </MenuItem>
        </MenuList>
      )}
    </Menu>
  )
}
