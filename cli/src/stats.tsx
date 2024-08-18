import React, { useEffect, useState } from 'react'
import { Box, render, Text } from 'ink'
import { usePublicClient } from './client.js'
import { type Pair, pairs as initPairs } from './config.js'
import { type Address, getContract, type GetContractReturnType, type PublicClient, zeroAddress } from 'viem'
import { useFactories } from './uniswap.js'
import { getTokenAddress, pairToStr } from './util.js'
import { CollateralTrackerAbi, DECIMALS, PanopticPoolAbi } from './constants.js'
import { type ERC20Metadata, useERC20 } from './token.js'

interface ValidatedPair extends Pair {
  token0Address: Address
  token1Address: Address
  uniswapPoolAddress: Address
  panopticPoolAddress: Address
}

type PanopticPool = GetContractReturnType<typeof PanopticPoolAbi, PublicClient>
type CollateralTracker = GetContractReturnType<typeof CollateralTrackerAbi, PublicClient>

interface CollateralPoolState {
  poolAssets: bigint
  inAmm: bigint
  utilization: number
}

interface CollateralInfo {
  totalAssets: bigint
  shares: bigint
  tokenAddress: Address
}

const useCollateralInfo = ({ address }: { address: Address }): CollateralInfo & CollateralPoolState & ERC20Metadata & { tracker?: CollateralTracker } => {
  const { network, client } = usePublicClient()
  const [shares, setShares] = useState<bigint>(0n)
  const [totalAssets, setTotalAssets] = useState<bigint>(0n)
  const [tracker, setTracker] = useState<CollateralTracker>()
  const [{ poolAssets, inAmm, utilization }, setPoolState] = useState<CollateralPoolState>({ poolAssets: 0n, inAmm: 0n, utilization: 0 })
  const [tokenAddress, setTokenAddress] = useState<Address>(zeroAddress)
  const { name, symbol, decimals } = useERC20({ address: tokenAddress })
  useEffect(() => {
    async function init () {
      if (!client) {
        return
      }
      const tracker = getContract({ address, abi: CollateralTrackerAbi, client })
      setTracker(tracker)
    }
    init().catch(console.error)
  }, [network, client, address])
  useEffect(() => {
    async function getStats () {
      if (!tracker) {
        return
      }
      const totalAssets = await tracker.read.totalAssets()
      setTotalAssets(totalAssets)
      const shares = await tracker.read.totalSupply()
      setShares(shares)
      const [poolAssets, inAmm, utilization] = await tracker.read.getPoolData()
      setPoolState({ poolAssets, inAmm, utilization: Number(utilization) / DECIMALS })
      const tokenAddress = await tracker.read.asset()
      setTokenAddress(tokenAddress)
    }
    getStats().catch(console.error)
  }, [tracker])
  return { name, symbol, decimals, tokenAddress, poolAssets, inAmm, utilization, tracker, shares, totalAssets }
}

const CollateralStats = ({ address }: { address: Address }) => {
  const { name, symbol, decimals, tokenAddress, poolAssets, inAmm, utilization, shares, totalAssets } = useCollateralInfo({ address })
  return <Box>
    <Text>{name} {symbol} {decimals}</Text>
    <Text>Underlying: {tokenAddress}</Text>
    <Text>{poolAssets.toString()}</Text>
    <Text>{inAmm.toString()}</Text>
    <Text>{utilization}</Text>
    <Text>{shares?.toString()}</Text>
    <Text>{totalAssets?.toString()}</Text>
  </Box>
}

const PoolStats = ({ pair }: { pair: ValidatedPair }): React.JSX.Element => {
  const { network, client } = usePublicClient()
  const [panopticPool, setPanopticPool] = useState<PanopticPool>()
  const [[token0, token1], setTokens] = useState<[Address, Address]>([zeroAddress, zeroAddress])
  const [price, setPrice] = useState<number>(0)
  const [recentPrices, setRecentPrices] = useState<number[]>([])

  useEffect(() => {
    async function init () {
      if (!client) {
        return
      }
      const pp = getContract({ address: pair.panopticPoolAddress, abi: PanopticPoolAbi, client })
      setPanopticPool(pp)
      const t0 = await pp.read.collateralToken0()
      const t1 = await pp.read.collateralToken1()
      setTokens([t0, t1])
    }
    init().catch(console.error)
  }, [network, client, pair])

  useEffect(() => {
    async function getStats () {
      if (!panopticPool) {
        return
      }
      const [priceArray, medianTick] = await panopticPool.read.getPriceArray()
      // TODO: convert ticks to prices
      setPrice(medianTick as number)
      setRecentPrices(priceArray as number[])
    }
    getStats().catch(console.error)
  }, [panopticPool])

  return <Box>
    <Text>{token0} {token1}</Text>
    <Text>{price}</Text>
    <Text>{recentPrices}</Text>
    <CollateralStats address={token0}/>
    <CollateralStats address={token1}/>
  </Box>
}

const Stats = () => {
  const { network, client } = usePublicClient()
  const { panopticFactory, uniswapFactory } = useFactories()
  const [pairs, setPairs] = useState<ValidatedPair[]>([])

  useEffect(() => {
    if (!client || !uniswapFactory || !panopticFactory || !network) {
      return
    }
    const init = async () => {
      const validatedPairs: ValidatedPair[] = []
      for (const pair of initPairs) {
        const { token0, token1, fee } = pair
        const token0Address = getTokenAddress(token0, network)
        const token1Address = getTokenAddress(token1, network)
        if (!token0Address) {
          console.error(`Unknown asset ${token0} on network ${network?.name}`)
          continue
        }
        if (!token1Address) {
          console.error(`Unknown asset ${token1} on network ${network?.name}`)
          continue
        }
        const uniswapPoolAddress = await uniswapFactory.read.getPool([token0Address, token1Address, fee])
        if (uniswapPoolAddress === zeroAddress) {
          console.error(`Cannot find Uniswap pool address for pair ${pairToStr(token0, token1, fee, network)} `)
          continue
        }
        const panopticPoolAddress = await panopticFactory.read.getPanopticPool([uniswapPoolAddress]) as Address
        if (panopticPoolAddress === zeroAddress) {
          console.error(`Panoptic pool is not created for pair ${pairToStr(token0, token1, fee, network)}`)
          continue
        }
        console.log(`Validated pair: ${pairToStr(token0, token1, fee, network)}`)
        validatedPairs.push({ ...pair, token0Address, token1Address, uniswapPoolAddress, panopticPoolAddress })
      }
      setPairs(validatedPairs)
      console.log(`${validatedPairs.length} pairs validated. Initial pair validation completed.`)
    }
    init().catch(console.error)
  }, [client, panopticFactory, uniswapFactory, network])
  return <Box>
    <Text>Pairs</Text>
    {pairs.map(pair => {
      return <PoolStats key={pair.panopticPoolAddress} pair={pair}/>
    })}

    {/* <Text>{JSON.stringify(pairs, null, 2)}</Text> */}
  </Box>
}

const renderStats = () => {
  render(<Stats/>)
}

export default renderStats
