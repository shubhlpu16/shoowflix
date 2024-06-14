import { useMediaQuery } from '@chakra-ui/react'

export const useResponsive = () => {
  const [isMobile] = useMediaQuery(
    '(min-device-width: 320px) and (max-device-width: 480px)',
    {
      ssr: true,
      fallback: false // return false on the server, and re-evaluate on the client side
    }
  )

  return { isMobile }
}
