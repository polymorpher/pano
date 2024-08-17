import { useEffect, useState } from 'react'
import { getContract, type GetContractReturnType, type PublicClient } from 'viem'
import { usePublicClient } from './client.js'
import { PanopticFactoryAbi, UniswapFactoryAbi } from './constants.js'
import { getPanopticFactoryAddress, getUniswapFactoryAddress } from './cmd.js'

export const useFactories = () => {
  const { client } = usePublicClient()
  const [panopticFactory, setPanopticFactory] = useState<GetContractReturnType<typeof PanopticFactoryAbi, PublicClient>>()
  const [uniswapFactory, setUniswapFactory] = useState<GetContractReturnType<typeof UniswapFactoryAbi, PublicClient>>()
  useEffect(() => {
    async function init () {
      if (!client) {
        return
      }
      const pf = getContract({ address: getPanopticFactoryAddress(), abi: PanopticFactoryAbi, client })

      setPanopticFactory(pf)
      // inaccessible from contract, until the member is made public
      // const uf = await pf.read.univ3Factory() as Address
      const uniswapFactory = getContract({ address: getUniswapFactoryAddress(), abi: UniswapFactoryAbi, client })
      setUniswapFactory(uniswapFactory)
    }
    init().catch(console.error)
  }, [client])
  return { panopticFactory, uniswapFactory }
}
