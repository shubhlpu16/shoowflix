import { useState, useEffect } from 'react'

export function useScrollLimit(limit: number): boolean {
  const [reached, setReached] = useState<boolean>(false)

  useEffect(() => {
    function onScroll(): void {
      const scrolled = window.scrollY < limit
      setReached(scrolled)
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [limit])

  return reached
}
