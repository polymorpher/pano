import React from 'react'
import { Box, Text } from 'ink'
import type { Options } from 'yargs'

interface CommandArgsProps {
  title: string
  args: Record<string, Options>
}

const CommandArgs: React.FC<CommandArgsProps> = ({ title, args }) => (
  <>
    <Box>
      <Text>{title ?? 'You can use additional flags below'}</Text>
    </Box>
    {Object.entries(args).map(([flag, option]) => (
      <Box key={flag}>
        <Box width="10">
          <Text>
            -{option.alias}, --{flag}
          </Text>
        </Box>
        <Text>{option.describe}</Text>
      </Box>
    ))}
  </>
)

export default CommandArgs
