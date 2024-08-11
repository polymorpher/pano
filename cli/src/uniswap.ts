import React, { useEffect, useState } from 'react'
import { type Abi, type Address, getContract, type GetContractReturnType, type PublicClient } from 'viem'
import { usePublicClient } from './client.js'
import { factoryAddress } from './config.js'
import { PanopticFactoryAbi, UniswapFactoryAbi } from './constants.js'

export const useFactories = () => {
  const { client } = usePublicClient()
  const [panopticFactory, setPanopticFactory] = useState<GetContractReturnType<Abi, PublicClient>>()
  const [uniswapFactory, setUniswapFactory] = useState<GetContractReturnType<Abi, PublicClient>>()
  useEffect(() => {
    async function init () {
      if (!client) {
        return
      }
      const pf = getContract({ address: factoryAddress, abi: PanopticFactoryAbi, client })
      setPanopticFactory(pf)
      const uf = await pf.read.univ3Factory() as Address
      const uniswapFactory = getContract({ address: uf, abi: UniswapFactoryAbi, client })
      setUniswapFactory(uniswapFactory)
    }
    init().catch(console.error)
  }, [client])
  return { panopticFactory, uniswapFactory }
}
