import { useEffect, useState } from 'react'
import {
  getContract,
  type GetContractReturnType,
  type PublicClient
} from 'viem'
import { usePublicClient } from 'src/client.js'
import { PanopticFactoryAbi, UniswapFactoryAbi } from 'src/constants.js'
import { getPanopticFactoryAddress, getUniswapFactoryAddress } from 'src/cmd.js'

type UniswapFactory = GetContractReturnType<
  typeof UniswapFactoryAbi,
  PublicClient
>
type PanopticFactory = GetContractReturnType<
  typeof PanopticFactoryAbi,
  PublicClient
>

export const useFactories = () => {
  const { client } = usePublicClient()
  const [panopticFactory, setPanopticFactory] = useState<PanopticFactory>()
  const [uniswapFactory, setUniswapFactory] = useState<UniswapFactory>()
  useEffect(() => {
    async function init() {
      if (!client) {
        return
      }
      const pf = getContract({
        address: getPanopticFactoryAddress(),
        abi: PanopticFactoryAbi,
        client
      })
      setPanopticFactory(pf)
      // inaccessible from contract, until the member is made public
      // const uf = await pf.read.univ3Factory() as Address
      const uniswapFactory = getContract({
        address: getUniswapFactoryAddress(),
        abi: UniswapFactoryAbi,
        client
      })
      setUniswapFactory(uniswapFactory)
    }
    init().catch(console.error)
  }, [client])
  return { panopticFactory, uniswapFactory }
}
