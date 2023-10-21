/* eslint-disable no-console */
// @ts-nocheck

import React, { useEffect } from 'react'

export interface WebTorPlayerProps {
  magnetURI: string
  imdbId: string
  poster: string
}

export const WebtorPlayer = ({
  magnetURI,
  imdbId,
  poster
}: WebTorPlayerProps) => {
  console.log('🚀 ~ file: webtor-player.tsx:17 ~ magnetURI:', magnetURI)
  useEffect(() => {
    window.webtor.push({
      id: 'player',
      magnet: magnetURI,
      on: function (e) {
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
  }, [imdbId, magnetURI, poster])

  return <div id="player" className="webtor"></div>
}
