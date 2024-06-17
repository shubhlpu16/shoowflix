/* eslint-disable no-console */
// @ts-nocheck

import React, { useEffect } from 'react'
import { getMagnetURI } from '@/utils/get-magnet-uri'
import { useResponsive } from '@/hooks/useResponsive'

export interface WebTorPlayerProps {
  hash: string
  imdbId: string
  poster: string
  url: string
}

export const WebtorPlayer = ({
  hash,
  imdbId,
  poster,
  url
}: WebTorPlayerProps) => {
  const { isMobile } = useResponsive()

  useEffect(() => {
    const play = () => {
      window.webtor = window.webtor || []
      window.webtor.push({
        id: 'player',
        className: 'player',
        magnet: getMagnetURI(hash, url),
        width: '100%',
        height: isMobile ? '300px' : '400px',
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

    play()
    return () => {
      window.webtor = []
    }
  }, [imdbId, hash, poster, url, isMobile])
  return <div id="player" className="webtor"></div>
}
