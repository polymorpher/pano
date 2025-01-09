import { Box as BoxInk, Text as BoxText } from 'ink'
import { Box as BoxUI } from '@chakra-ui/react/box'
import { Text as TextUI } from '@chakra-ui/react/typography'

export const Box = typeof document === 'undefined' ? BoxInk : BoxUI

export const Text = typeof document === 'undefined' ? BoxText : TextUI
