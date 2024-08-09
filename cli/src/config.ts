import * as dotenv from 'dotenv'
import * as process from 'process'
dotenv.config()

const DEBUG = process.env.DEBUG === 'true' || process.env.DEBUG === '1'
const config = {
  debug: DEBUG,
  // rpc: process.env.RPC ?? 'https://api.harmony.one',
  rpc: process.env.RPC ?? 'http://127.0.0.1',
  // chainId: process.env.CHAIN_ID ?? 0x63564C40  // harmony's chain id,
  chainId: Number(process.env.CHAIN_ID ?? 1),
  factoryAddress: process.env.FACTORY_ADDRESS ?? '0x00436c9f57dffd96cecd129c04d9e488c57266cf' // local ETH fork's deployment address, using test/junk mnemonic
}

export default config
