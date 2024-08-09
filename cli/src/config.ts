import * as dotenv from 'dotenv'
import * as process from 'process'
dotenv.config()

const DEBUG = process.env.DEBUG === 'true' || process.env.DEBUG === '1'

interface Network {
  rpc: string
  chainId: number
  nativeCurrency: { name: string, symbol: string, decimals: number }
}

interface Config {
  debug: boolean
  networks: Record<string, Network>
  factoryAddress: string
}
const config: Config = {
  debug: DEBUG,
  networks: {
    local: {
      rpc: 'http://127.0.0.1:8545',
      chainId: 1,
      nativeCurrency: {
        name: 'Ether',
        symbol: 'ETH',
        decimals: 18
      }
    },
    anvil: {
      rpc: 'http://127.0.0.1:8545',
      chainId: 31337,
      nativeCurrency: {
        name: 'Ether',
        symbol: 'ETH',
        decimals: 18
      }
    },
    harmony: {
      rpc: 'https://api.harmony.one',
      chainId: 0x63564C40,
      nativeCurrency: {
        name: 'ONE',
        symbol: 'ONE',
        decimals: 18
      }
    }
  },

  factoryAddress: process.env.FACTORY_ADDRESS ?? '0x00436c9f57dffd96cecd129c04d9e488c57266cf' // local ETH fork's deployment address, using test/junk mnemonic
}

export default config
