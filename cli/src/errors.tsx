import { SectionTitle } from './common.js'
import React from 'react'
import { Box, Text } from 'ink'
import { useCli } from './commands.tsx'

export const WalletRequired = () => {
  const cli = useCli()
  return (
    <Box flexDirection={'column'}>
      <SectionTitle>Error</SectionTitle>
      {cli ? (
        <Text>
          A wallet is required to do this. Please specify wallet using --pk
          option.
        </Text>
      ) : (
        <Text>A wallet is required to do this. Please load a wallet first</Text>
      )}
    </Box>
  )
}
