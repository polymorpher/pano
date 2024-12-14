import { usePublicClient } from './client.js'
import { useEffect, useState } from 'react'
import {
  getContract,
  type GetContractReturnType,
  type PublicClient
} from 'viem'
import { PanopticHelperAbi } from './constants.js'
import { getPanopticHelperAddress } from './command/cmd.js'

export type PanopticHelper = GetContractReturnType<
  typeof PanopticHelperAbi,
  PublicClient
>

// for making use of Panoptic helper specifically, to create option combos (that have multiple legs which hedge against each other)
// Need to call the smart contract because Panoptic SDK does not replicate the Solidity implementation

export const useHelper = () => {
  const { client } = usePublicClient()
  const [helper, setHelper] = useState<PanopticHelper>()

  useEffect(() => {
    if (!client) {
      return
    }
    const c = getContract({
      address: getPanopticHelperAddress(),
      abi: PanopticHelperAbi,
      client
    })
    setHelper(c)
  }, [client])

  return { helper }
}
