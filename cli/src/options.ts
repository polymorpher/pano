import { type Options } from 'yargs'
const options: Record<string, Options> = {
  network: {
    alias: 'n',
    type: 'string',
    default: 'local',
    describe: 'The network you want to use, which provides a set of default values for RPC, chain id, and contract addresses, so you don\'t need to specify them one by one\n' +
        '  - local (forked ETH mainnet): RPC=http://localhost:8545 chainId=1\n' +
        '  - anvil: RPC=http://localhost:8545 chainId=31337\n' +
        '  - harmony: RPC=https://api.harmony.one chainId=1666600000'
  },
  rpc: {
    alias: 'r',
    type: 'string',
    describe: 'RPC server for the blockchain, to override network default value'
  },
  chainId: {
    alias: 'c',
    type: 'number',
    describe: 'Chain ID for the blockchain, to override network default value'
  },
  uniswapFactory: {
    type: 'string',
    describe: 'Uniswap V3 Factory Deployment Address'
  },
  panopticFactory: {
    type: 'string',
    describe: 'Panoptic Factory Deployment Address'
  }
}
export default options
