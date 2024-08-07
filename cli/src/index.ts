import yargs from 'yargs/yargs'
import { hideBin } from 'yargs/helpers'

const argv = yargs(hideBin(process.argv))
  .command('lp', 'Show liquidity provider tools')
  .demandCommand(1)
  .strict()
  .argv

const isCommand = (command: string) => argv._[0] === command

async function main () {
  if (isCommand('lp')) {
    console.log('test')
    return
  }
  console.log('test2')
}

main().catch(console.error)
