import { theme as ChakraTheme, extendTheme, type Theme } from '@chakra-ui/react'
import { colors } from './colors'

export const theme: Partial<Theme> = extendTheme({
  ...ChakraTheme,
  colors,
  breakpoints: {
    sm: '375px',
    md: '640px',
    lg: '768px',
    xl: '1024px',
    '2xl': '1280px'
  },
  styles: {
    global: {
      body: {
        bg: 'gray.600',
        color: 'gray.0'
      }
    }
  }
})
