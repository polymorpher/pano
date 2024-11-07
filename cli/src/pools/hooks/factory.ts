import { useEffect, useState } from 'react'
import {
  type Address,
  getContract,
  type GetContractReturnType,
  type PublicClient
} from 'viem'
import { usePublicClient } from 'src/client.js'
import { PanopticFactoryAbi, UniswapFactoryAbi } from 'src/constants.js'
import { useOption } from 'src/commands.js'
import {
  defaultPanopticfactoryAddress,
  defaultUniswapFactoryAddress
} from 'src/config.js'

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
  const pfa = useOption('panopticFactory') as Address
  const ufa = useOption('uniswapFactory') as Address
  const [panopticFactory, setPanopticFactory] = useState<PanopticFactory>()
  const [uniswapFactory, setUniswapFactory] = useState<UniswapFactory>()

  useEffect(() => {
    async function init() {
      if (!client) {
        return
      }
      const pf = getContract({
        address: pfa ?? defaultPanopticfactoryAddress,
        abi: PanopticFactoryAbi,
        client
      })
      setPanopticFactory(pf)
      // inaccessible from contract, until the member is made public
      // const uf = await pf.read.univ3Factory() as Address
      const uniswapFactory = getContract({
        address: ufa ?? defaultUniswapFactoryAddress,
        abi: UniswapFactoryAbi,
        client
      })
      setUniswapFactory(uniswapFactory)
    }
    init().catch(console.error)
  }, [client, pfa, ufa])

  return { panopticFactory, uniswapFactory }
}
