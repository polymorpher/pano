import React, { useEffect, useState } from 'react'
import { type Address, getContract, type PublicClient, type GetContractReturnType } from 'viem'
import { publicClient } from './client.js'
import { factoryAddress } from './config.js'
import { PanopticFactoryAbi, UniswapFactoryAbi } from './constants.js'

export const useFactories = () => {
  const [client] = useState<PublicClient | undefined>(publicClient())
  const [panopticFactory, setPanopticFactory] = useState<GetContractReturnType>()
  const [uniswapFactory, setUniswapFactory] = useState<GetContractReturnType>()
  useEffect(() => {
    async function init () {
      if (!client) {
        return
      }
      const panopticFactory = getContract({ address: factoryAddress, abi: PanopticFactoryAbi, client })
      setPanopticFactory(panopticFactory)
      const uniswapFactoryAddress = await panopticFactory.read.univ3Factory() as Address
      const uniswapFactory = getContract({ address: uniswapFactoryAddress, abi: UniswapFactoryAbi, client })
      setUniswapFactory(uniswapFactory)
    }
    init().catch(console.error)
  }, [client])
  return [panopticFactory, uniswapFactory]
}
