import React from 'react'
import * as process from 'process'

import { render } from 'ink'
import yargs from 'yargs/yargs'
import type { Argv } from 'yargs'
import { hideBin } from 'yargs/helpers'
import options from './options.ts'
import { CommandKeys, Commands } from './commands.tsx'
import Mainframe from './mainframe.tsx'
import { buildPublicClient, parseInitialNetwork } from './client.tsx'

const main = (): Argv => {
  let cmd = yargs(hideBin(process.argv))
    .middleware(async (arg) => {
      try {
        const network = parseInitialNetwork(arg)
        const client = buildPublicClient(network)

        console.log('Testing RPC connection...')

        if (!client) {
          console.error('Failed to create RPC client!')
          process.exit(1)
        }

        const resChainId = await client.getChainId()

        if (network.chainId !== resChainId) {
          console.error(
            `Chain ID mismatch! RPC Response: ${resChainId}, Expected: ${network.chainId}`
          )
          process.exit(1)
        }
        console.log(
          'RPC Connection test completed. Retrieving option pool stats...'
        )
      } catch (e) {
        console.error(e.message)
        process.exit(1)
      }
    })
    .command(
      '$0',
      'Interactively communicate with a Panoptic option pool deployment. Configuration parameters (network, contract address, wallet...) can be set using command line arguments, or inside the interactive interface\n'
    )
    .command(
      'start',
      'Enter interactive mode\n',
      () => {},
      async (arg) => {
        const { waitUntilExit } = render(<Mainframe options={arg} />)
        await waitUntilExit()
      }
    )

  cmd = Object.keys(Commands)
    .filter(
      (c) => ![CommandKeys.Quit, CommandKeys.Wallet].includes(c as CommandKeys)
    )
    .reduce<Argv>((acc, c) => {
      const key = c as CommandKeys
      const cmd = Commands[key]
      const desc = cmd.tbd ? `[Coming soon] ${cmd.desc}` : cmd.desc

      return acc.command(
        c,
        `${desc}\n`,
        () => {},
        async (arg) => {
          const { waitUntilExit } = render(
            <Mainframe options={arg} command={key} cli />
          )
          await waitUntilExit()
        }
      )
    }, cmd)

  cmd = cmd.help('help', 'Show help').options(options).strict()

  return cmd
}

main().argv
