import { useState, useEffect } from 'react'

export function useScrollLimit(limit: number): boolean {
  const [reached, setReached] = useState<boolean>(false)

  useEffect(() => {
    function onScroll(e): void {
      console.log('🚀 ~ onScroll ~ e:', e)
      const scrolled = window.scrollY < limit
      setReached(scrolled)
    }
    console.log('🚀 ~ useEffect ~ window:', window)

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [limit])

  return reached
}
