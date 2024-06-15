import { useState, useEffect } from 'react'
import { throttle } from 'lodash'

const useScrollLimit = (limit: number) => {
  const [isLimitCrossed, setIsLimitCrossed] = useState(false)

  useEffect(() => {
    const handleScroll = throttle(() => {
      const scrollTop = window.scrollY
      console.log('🚀 ~ handleScroll ~ scrollTop:', window.scrollY)
      if (scrollTop >= limit && !isLimitCrossed) {
        setIsLimitCrossed(true)
      } else if (scrollTop < limit && isLimitCrossed) {
        setIsLimitCrossed(false)
      }
    }, 200)
    document
      ?.getElementById('__next')
      ?.addEventListener('scroll', handleScroll, true)

    return () => {
      window.removeEventListener('scroll', handleScroll, true)
      handleScroll.cancel() // Cancel any pending throttled calls
    }
  }, [])

  return isLimitCrossed
}

export default useScrollLimit
