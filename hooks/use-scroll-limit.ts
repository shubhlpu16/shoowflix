'use client'
import { useEffect, useState } from 'react'

export function useScrollLimit(limit: number): boolean {
  const [reached, setReached] = useState<boolean>(false)

  useEffect(() => {
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  })

  function onScroll(): void {
    const scrolled: boolean = window.scrollY > limit

    setReached(scrolled)
  }

  return reached
}
