import { SectionTitle } from './common.js'
import React, { useContext, useEffect } from 'react'
import { Box, Text } from 'ink'
import { NotificationContext } from './notification.js'
import { isCli } from './cmd.ts'

export const WalletRequired = () => {
  const { addMessage } = useContext(NotificationContext)

  useEffect(() => {
    if (isCli()) {
      addMessage(
        'A wallet is required to do this. Please specify wallet using --pk option.',
        { color: 'red' }
      )
    }
  }, [addMessage])

  if (isCli()) {
    return <></>
  }

  return (
    <Box flexDirection={'column'}>
      <SectionTitle>Error</SectionTitle>
      <Text>A wallet is required to do this. Please load a wallet first</Text>
    </Box>
  )
}
