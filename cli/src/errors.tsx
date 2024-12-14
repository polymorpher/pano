import { SectionTitle } from './common.js'
import React, { useContext, useEffect } from 'react'
import { Box, Text } from 'ink'
import { NotificationContext } from './notification.js'
import { isCli } from './command/cmd.ts'
import type { Options } from 'yargs'

interface SimpleHelpMessageProps {
  title: string
  args: Record<string, Options>
}

export const SimpleHelpMessage: React.FC<SimpleHelpMessageProps> = ({
  title,
  args
}) => (
  <>
    <Box>
      <Text>{title ?? 'You can use additional flags below'}</Text>
    </Box>
    {Object.entries(args).map(([flag, option]) => (
      <Box key={flag}>
        <Box width="20">
          {option.alias ? (
            <Text>
              --{flag}, -{option.alias}
            </Text>
          ) : (
            <Text>--{flag}</Text>
          )}
        </Box>
        <Text>{option.describe}</Text>
      </Box>
    ))}
  </>
)

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
