import { SectionTitle } from './common.js'
import React from 'react'
import { Box, Text } from 'ink'

export const WalletRequired = () => {
  return (
    <Box flexDirection={'column'}>
      <SectionTitle>Error</SectionTitle>
      <Text>A wallet is required to do this. Please load a wallet first</Text>
    </Box>
  )
}
