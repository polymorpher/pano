import { useContext, useEffect, useState } from 'react'
import { NotificationContext } from '../../notification.js'
import { type Address, getContract, zeroAddress } from 'viem'
import { usePublicClient } from '../../client.js'
import { useERC20 } from '../../token.js'
import { CollateralTrackerAbi, DECIMALS } from '../../constants.js'
import {
  type CollateralAddresses,
  type CollateralFullInfo,
  type CollateralPoolState,
  type CollateralTracker,
  EmptyTokenPair,
  type PanopticPool
} from './common.js'
import { useWallet } from '../../wallet.js'

export const useCollateralAddresses = (panopticPool?: PanopticPool): CollateralAddresses => {
  const { addMessage } = useContext(NotificationContext)

  const [[collateral0, collateral1], setTokens] = useState<[Address | undefined, Address | undefined]>(EmptyTokenPair)
  useEffect(() => {
    async function init () {
      if (!panopticPool) {
        return
      }
      const t0 = await panopticPool.read.collateralToken0()
      if (t0 === zeroAddress) {
        addMessage('Bad collateral token0 tracker address', { color: 'red' })
        return
      }
      const t1 = await panopticPool.read.collateralToken1()
      if (t1 === zeroAddress) {
        addMessage('Bad collateral token0 tracker address', { color: 'red' })
        return
      }
      setTokens([t0, t1])
    }
    init().catch(ex => { addMessage((ex as Error).toString(), { color: 'red' }) })
  }, [panopticPool, addMessage])
  return { collateral0, collateral1 }
}

export const useCollateralContract = (collateralAddress?: Address): CollateralTracker | undefined => {
  const { addMessage } = useContext(NotificationContext)
  const { client } = usePublicClient()
  const [tracker, setTracker] = useState<CollateralTracker>()
  useEffect(() => {
    async function init () {
      if (!client || !collateralAddress) {
        return
      }
      const tracker = getContract({ address: collateralAddress, abi: CollateralTrackerAbi, client })
      setTracker(tracker)
    }
    init().catch(ex => { addMessage((ex as Error).toString(), { color: 'red' }) })
  }, [addMessage, client, collateralAddress])
  return tracker
}

export const useCollateralInfo = (address?: Address): CollateralFullInfo => {
  const [shares, setShares] = useState<bigint>(0n)
  const [totalAssets, setTotalAssets] = useState<bigint>(0n)
  const tracker = useCollateralContract(address)
  const [{ poolAssets, inAmm, utilization }, setPoolState] = useState<CollateralPoolState>({ poolAssets: 0n, inAmm: 0n, utilization: 0 })
  const [tokenAddress, setTokenAddress] = useState<Address | undefined>()
  const { name, symbol, decimals, contract: tokenContract } = useERC20(tokenAddress)
  const { addMessage } = useContext(NotificationContext)
  const [ready, setReady] = useState<boolean>(false)

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
      setReady(true)
      // console.log({ totalAssets, shares, poolAssets, inAmm, tokenAddress })
    }
    getStats().catch(ex => { addMessage((ex as Error).toString(), { color: 'red' }) })
  }, [addMessage, tracker])
  return { address, name, symbol, decimals, tokenAddress, poolAssets, inAmm, utilization, tracker, shares, totalAssets, tokenContract, ready }
}

export const useCollateralBalance = (collateralTracker?: CollateralTracker) => {
  const [shares, setShares] = useState<bigint>(0n)
  const [value, setValue] = useState<bigint>(0n)
  const wallet = useWallet()
  const { addMessage } = useContext(NotificationContext)
  useEffect(() => {
    async function init () {
      if (!collateralTracker || !wallet.wallet.address) {
        setShares(0n)
        setValue(0n)
        return
      }
      const balance = await collateralTracker.read.balanceOf([wallet.wallet.address])
      setShares(balance)
      const shareValue = await collateralTracker.read.convertToAssets([balance])
      setValue(shareValue)
    }
    init().catch(ex => { addMessage((ex as Error).toString(), { color: 'red' }) })
  }, [addMessage, collateralTracker, wallet.wallet.address])
  return { shares, value }
}
