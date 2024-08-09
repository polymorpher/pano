import config from './config.js'
import { type Options } from 'yargs'
const options: Record<string, Options> = {
  network: {
    alias: 'n',
    type: 'string',
    default: 'local',
    describe: 'The network you want to use, which provides a set of default values for RPC, chain id, and contract addresses, so you don\'t need to specify them one by one'
  },
  rpc: {
    alias: 'r',
    type: 'string',
    default: config.rpc,
    describe: 'RPC server for the blockchain'
  },
  chainId: {
    alias: 'c',
    type: 'number',
    default: config.chainId,
    describe: 'Chain ID for the blockchain'
  }
}
export default options
