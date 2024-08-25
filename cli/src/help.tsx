import React from 'react'
import { Text, Box } from 'ink'
import { Commands } from './commands.js'

export const HelpMessage = () => {
  return <>
    <Box borderStyle={'single'} borderColor={'yellow'} paddingX={1} marginY={1}><Text color={'yellow'}>Help Menu</Text></Box>
    {Object.values(Commands).map(c => {
      return <Text color={c.tbd ? 'gray' : undefined } key={c.full}>({c.short}) {c.full} - {c.tbd ? '[Coming soon] ' : ''}{c.wallet ? '[wallet required] ' : ''}{c.desc} </Text>
    })}
    <Text/>
  </>
}
