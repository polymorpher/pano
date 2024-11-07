import { SectionTitle } from './common.js'
import React, { useContext, useEffect } from 'react'
import { Box, Text } from 'ink'
import { useCli } from './commands.js'
import { NotificationContext } from './notification.js'

export const WalletRequired = () => {
  const cli = useCli()
  const { addMessage } = useContext(NotificationContext)

  useEffect(() => {
    if (cli) {
      addMessage(
        'A wallet is required to do this. Please specify wallet using --pk option.',
        { color: 'red' }
      )
    }
  }, [addMessage, cli])

  if (cli) {
    return <></>
  }

  return (
    <Box flexDirection={'column'}>
      <SectionTitle>Error</SectionTitle>
      <Text>A wallet is required to do this. Please load a wallet first</Text>
    </Box>
  )
}
