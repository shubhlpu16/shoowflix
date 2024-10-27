import React, { forwardRef, useImperativeHandle } from 'react'
// import { BsFillPlayFill } from 'react-icons/bs'
// import { Stack } from '@chakra-ui/react'
import { play } from '@/utils/play'

export const WebtorPlayer = forwardRef((_props, ref) => {
  useImperativeHandle(ref, () => ({
    load: (hash: string, url: string, imdbId: string, poster: string) => {
      play(hash, url, imdbId, poster)
    }
  }))

  return <div id="player" className="webtor"></div>
})
