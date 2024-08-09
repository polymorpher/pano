import yargs from 'yargs/yargs'
import { hideBin } from 'yargs/helpers'
import * as process from 'process'
import options from './options.js'

const cmd = await yargs(hideBin(process.argv))
  .command('lp', 'Show liquidity provider tools')
  .options(options)
  .demandCommand(1)
  .strict()
  .argv

const isCommand = (command: string) => cmd._[0] === command

async function main () {
  if (isCommand('lp')) {
    console.log('test')
    return
  }
  console.log('test2')
}

main().catch(console.error)
