import Trackers from '@/utils/trackers'

export const getMagnetURI = (hash: string, url: string) => {
  try {
    const trackers = Trackers.getTrackers()
    const uri = `magnet:?xt=urn:btih:${hash}`
    const encodedTrackers = trackers
      .map((tracker) => `tr=${encodeURIComponent(tracker)}`)
      .join('&')
    const separator = uri.includes('?') ? '&' : '?'
    return `${uri}${separator}${encodedTrackers}&xs=${url}`
  } catch (error) {
    console.error('Error creating magnet URI:', error)
    return null
  }
}
