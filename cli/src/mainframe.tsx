import React from 'react'
import { render } from 'ink'
import { PublicClientProvider } from './client.js'
import Stats from './stats.js'

const Mainframe = () => {
  return <PublicClientProvider>
    <Stats/>
  </PublicClientProvider>
}

export default Mainframe

export const renderMainframe = () => {
  render(<Mainframe/>)
}
