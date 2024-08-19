import { useEffect, useState } from 'react'
import { type Address, getContract, type GetContractReturnType, type PublicClient, isAddress } from 'viem'

import {
  IERC20Abi,
  IERC20MetadataAbi
} from './constants.js'
import { usePublicClient } from './client.js'

type IERC20 = GetContractReturnType<typeof IERC20MetadataAbi, PublicClient>

export interface ERC20Metadata {
  name: string
  symbol: string
  decimals: number
}

export const useERC20 = ({ address }: { address: Address }): ERC20Metadata & { contract?: IERC20 } => {
  const { client } = usePublicClient()
  const [name, setName] = useState<string>('')
  const [decimals, setDecimals] = useState<number>(0)
  const [symbol, setSymbol] = useState<string>('')
  const [contract, setContract] = useState<IERC20>()

  useEffect(() => {
    async function init () {
      if (!client || !isAddress(address)) {
        return
      }
      const c = getContract({ abi: IERC20Abi, address, client })
      const cm = getContract({ abi: IERC20MetadataAbi, address, client })
      // c.read.
      setContract(c)
      const name = await cm.read.name()
      const symbol = await cm.read.symbol()
      const decimals = await cm.read.decimals()
      setName(name)
      setSymbol(symbol)
      setDecimals(decimals)
    }
    init().catch(console.error)
  }, [address, client])
  return { name, decimals, symbol, contract }
}
