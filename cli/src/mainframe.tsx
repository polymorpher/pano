import React from 'react'
import { render, useInput, useStdout, Box, Text } from 'ink'
import { PublicClientProvider } from './client.js'
import Stats from './stats.js'
import process from 'process'

const UserInput = () => {
  const { write } = useStdout()
  // const { write: writeErr } = useStderr()
  useInput((input, key) => {
    write(`input: ${input}`)
    if (input === 'q') {
      // Exit program
      process.exit(0)
    }
  })
  return <Box><Text>Command: </Text></Box>
}

const Mainframe = () => {
  return <PublicClientProvider>
    <Stats/>
    <UserInput/>
  </PublicClientProvider>
}

export default Mainframe

export const renderMainframe = () => {
  return render(<Mainframe/>)
}
