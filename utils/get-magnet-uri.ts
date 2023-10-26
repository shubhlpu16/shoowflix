import { trackers } from './trackers'
export const getMagnetURI = (hash: string) => {
  const uri = `magnet:?xt=urn:btih:${hash}`
  const encodedTrackers = trackers
    .map((tracker) => encodeURIComponent(tracker))
    .join('&tr=')
  const separator = uri.includes('?') ? '&' : '?'
  return `${uri}${separator}tr=${encodedTrackers}`
}
