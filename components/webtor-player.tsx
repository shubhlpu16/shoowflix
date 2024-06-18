/* eslint-disable no-console */
// @ts-nocheck

import React, { forwardRef, useImperativeHandle } from 'react'
import { getMagnetURI } from '@/utils/get-magnet-uri'
import { BsFillPlayFill } from 'react-icons/bs'
import { Stack } from '@chakra-ui/react'

export const WebtorPlayer = forwardRef((_props, ref) => {
  let webtor = window.webtor || []
  const play = (hash, imdbId, poster, url) => {
    webtor.push({
      id: 'player',
      className: 'player',
      magnet: getMagnetURI(hash, url),
      width: '100%',
      height: '400px',
      imdmbid: imdbId,
      poster,
      features: {
        download: true,
        fullscreen: true,
        chromecast: true
      },
      on: function (e) {
        if (e.name == window.webtor.INITED) {
          e.player.play()
        }
        if (e.name == window.webtor.TORRENT_FETCHED) {
          console.log('Torrent fetched!', e.data)
        }
        if (e.name == window.webtor.TORRENT_ERROR) {
          console.log('Torrent error!')
        }
      },
      lang: 'en',
      i18n: {
        en: {
          common: {
            'prepare to play': 'Preparing Video Stream... Please Wait...'
          },
          stat: {
            seeding: 'Seeding',
            waiting: 'Client initialization',
            'waiting for peers': 'Waiting for peers',
            from: 'from'
          }
        }
      }
    })
  }

  useImperativeHandle(ref, () => ({
    load: (hash, url, imdbId, poster) => {
      document.getElementById('player').innerHTML = ''
      play(hash, url, imdbId, poster)
    },
    unload: () => {}
  }))

  return (
    <div id="player" className="webtor">
      <Stack direction="column" spacing={8} alignItems="center">
        <div className="placeholder">
          <BsFillPlayFill className="icon" />
        </div>
        <p>Select resolution to start streaming</p>
      </Stack>
    </div>
  )
})
