import { type Colors } from '@chakra-ui/react'

export const colors: Colors = {
  /**
   * Gray is a neutral color and is the foundation of the colour of our system.
   * Almost everything in UI design — text, form fields, backgrounds, dividers — are usually gray.
   */
  gray: {
    0: '#FFFFFF',
    25: '#F9F9F7',
    50: '#F2F2ED',
    75: '#ECECE5',
    100: '#E3E3DB',
    200: '#D6D6CE',
    300: '#C2C2B9',
    400: '#A9A9A2',
    500: '#91A3A4',
    600: '#141414',
    700: '#524E43',
    800: '#A9A9A2'
  },
  /**
   * The green colors is our "brand" colour, and is used across all interactive elements such as buttons, links, inputs, etc.
   * This color defines the overall feel and can elicit emotion.
   */
  green: {
    25: '#73B788',
    30: '#2FA252',
    50: '#8DA5A3',
    100: '#799290',
    200: '#5A7371',
    300: '#425C5A',
    400: ' #8DA5A3'
  },
  orange: {
    50: '#E5AB7A',
    100: '#E89A59',
    200: '#E38A3E',
    300: '#B0560A',
    400: '#FFA263',
    500: '#CD6C1A',
    600: '#EFAE31'
  },
  brown: {
    200: '#797464',
    300: '#797464',
    400: '#4B483D',
    500: '#6B6759',
    600: '#646157',
    700: '#858174',
    800: '#101828'
  },
  /**
   * Error fall red colours are used across error states and in "destructive" actions.
   * They communicate a destructive/negative action, such as cancelling a subscription.
   * Not to be used as main colours.
   */
  red: {
    100: '#EB9994',
    200: '#F17D7D',
    300: '#F26464',
    400: '#FF5353',
    500: '#FF0000',
    600: '#D83452'
  },
  status: {
    50: '#F26464',
    100: '#73B788'
  }
}
