import { Box as BoxInk, Text as BoxText } from 'ink'
import { Box as BoxUI, Text as TextUI } from '@chakra-ui/react'

export const Box = typeof document === 'undefined' ? BoxInk : BoxUI

export const Text = typeof document === 'undefined' ? BoxText : TextUI
