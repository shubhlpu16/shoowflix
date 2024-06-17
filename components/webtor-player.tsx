/* eslint-disable no-console */
// @ts-nocheck

import React, { useEffect } from 'react'

import { getMagnetURI } from '@/utils/get-magnet-uri'
// import WebTorrent from 'webtorrent/dist/webtorrent.min.js'

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
  console.log('🚀 ~ hash:', hash)
  useEffect(() => {
    console.log('WebtorPlayer')
    const play = () => {
      window.webtor = window.webtor || []
      window.webtor.push({
        id: 'player',
        className: 'player',
        magnet: getMagnetURI(hash, url),
        width: '100%',
        height: '400px',
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
        imdmbid: imdbId,
        poster,
        features: {
          controls: false,
          download: true,
          autoSubtitles: true,
          continue: true,
          subtitles: true,
          settings: false,
          fullscreen: true,
          playpause: true,
          currentTime: true,
          timeline: true,
          duration: true,
          volume: true,
          chromecast: true
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
      console.log('close')
    }
  }, [hash, imdbId, poster, url])

  return (
    <>
      <div id="player"></div>
      <button
        onClick={() => {
          window.webtor = []
        }}
      >
        hhi
      </button>
    </>
  )
}
