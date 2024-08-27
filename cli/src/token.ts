import { useCallback, useContext, useEffect, useState } from 'react'
import {
  type Account,
  type Address, type Chain,
  getContract,
  type GetContractReturnType,
  type PublicClient,
  type Transport,
  type WalletClient
} from 'viem'

import {
  IERC20Abi,
  IERC20MetadataAbi
} from './constants.js'
import { usePublicClient } from './client.js'
import { useWallet } from './wallet.js'
import { NotificationContext } from './notification.js'

export type IERC20Metadata = GetContractReturnType<typeof IERC20MetadataAbi, PublicClient>
export type IERC20 = GetContractReturnType<typeof IERC20Abi, PublicClient>
// export type IERC20Writable = GetContractReturnType<typeof IERC20Abi, WalletClient<Transport, Chain, Account >>

export interface ERC20Metadata {
  name: string
  symbol: string
  decimals: number
}

export const useERC20 = (address?: Address): ERC20Metadata & { contract?: IERC20, metadataContract?: IERC20Metadata } => {
  const { client } = usePublicClient()
  const [name, setName] = useState<string>('')
  const [decimals, setDecimals] = useState<number>(0)
  const [symbol, setSymbol] = useState<string>('')
  const [contract, setContract] = useState<IERC20>()
  const [metadataContract, setMetadataContract] = useState<IERC20Metadata>()

  useEffect(() => {
    async function init () {
      if (!client || !address) {
        return
      }
      const c = getContract({ abi: IERC20Abi, address, client })
      const cm = getContract({ abi: IERC20MetadataAbi, address, client })
      setContract(c)
      setMetadataContract(cm)
      const name = await cm.read.name()
      const symbol = await cm.read.symbol()
      const decimals = await cm.read.decimals()
      setName(name)
      setSymbol(symbol)
      setDecimals(decimals)
    }
    init().catch(console.error)
  }, [address, client])
  return { name, decimals, symbol, contract, metadataContract }
}

export const useERC20Balance = (contract?: IERC20) => {
  const [balance, setBalance] = useState<bigint>(0n)
  const wallet = useWallet()
  const { addMessage } = useContext(NotificationContext)
  const allowanceOf = useCallback(async (spender: Address): Promise<bigint> => {
    if (!contract || !wallet.wallet.address) {
      return 0n
    }
    return await contract.read.allowance([wallet.wallet.address, spender])
  }, [wallet.wallet.address, contract])

  useEffect(() => {
    async function init () {
      if (!contract || !wallet.wallet.address) {
        setBalance(0n)
        return
      }
      const balance = await contract.read.balanceOf([wallet.wallet.address])
      setBalance(balance)
    }
    init().catch(ex => { addMessage((ex as Error).toString(), { color: 'red' }) })
  }, [wallet.wallet.address, addMessage, contract])
  return { balance, allowanceOf }
}
