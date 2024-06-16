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
  useEffect(() => {
    const play = () => {
      window.webtor.push({
        id: 'player',
        magnet: getMagnetURI(hash, url),
        width: '100%',
        height: '400px',
        torrentUrl: url,
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

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.min.js', { scope: '/' })
        .then((reg) => {
          const worker = reg.active || reg.waiting || reg.installing

          const checkState = (worker) => {
            if (worker.state === 'activated') {
              play()
              return true
            }
            return false
          }

          if (!checkState(worker)) {
            worker.addEventListener('statechange', ({ target }) =>
              checkState(target)
            )
          }
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error)
        })
    } else {
      console.warn('Service Workers are not supported in this browser')
    }
  }, [hash, url, imdbId, poster])

  return <div id="player"></div>
}
