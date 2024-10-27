import { getMagnetURI } from './get-magnet-uri'

export const play = (
  hash: string,
  imdbId: string,
  poster: string,
  url: string
) => {
  const playerElement = document.getElementById('player')
  if (playerElement) {
    playerElement.innerHTML = ''
    const webtor = window.webtor || []
    webtor.push({
      id: 'player',
      className: 'player',
      magnet: getMagnetURI(hash, url),
      imdmbid: imdbId,
      controls: true,
      poster,
      features: {
        autoSubtitles: true,
        title: false,
        p2pProgress: true,
        subtitles: true,
        fullscreen: true,
        chromecast: true,
        embed: false
      },
      on: function (e: any) {
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
}
