import { type Address, getContract, type Hex } from 'viem'
import { useCallback, useState, useEffect, useContext } from 'react'
import { calculateTokenId, type Position, type PositionWithData } from '../common.js'
import { readPositions, storePosition, removePosition } from '../db.js'
import { useWallet } from '../wallet.js'
import { NotificationContext } from '../notification.js'
import { ScalingFactor, stringify } from '../util.js'
import { groupBy } from 'remeda'
import { PanopticPoolAbi } from '../constants.js'
import { useFactories } from '../pools/uniswap.js'
import { usePublicClient } from '../client.js'

export const usePositions = (uniswapPoolAddress?: Address) => {
  const { wallet } = useWallet()
  const { client } = usePublicClient()
  const { addMessage } = useContext(NotificationContext)
  const [positions, setPositions] = useState<PositionWithData[]>([])
  const positionIds = positions.map(p => BigInt(p.id))
  const { panopticFactory } = useFactories()
  const reloadPositions = useCallback(async () => {
    if (!wallet.address || !panopticFactory || !client) {
      return
    }
    const ps = await readPositions(wallet.address, uniswapPoolAddress)
    // addMessage(`Found ${ps.length} local positions. Sorting...`)
    const positionsByPool = groupBy(ps, p => p.uniswapPoolAddress)
    const positionsPA = Object.entries(positionsByPool).map(async ([upa, positions]) => {
      const ppAddress = await panopticFactory.read.getPanopticPool([upa as Address])
      const panopticPool = getContract({ address: ppAddress, abi: PanopticPoolAbi, client })
      return await Promise.all(positions.map(async p => {
        const [balance, u0, u1] = await panopticPool.read.optionPositionBalance([wallet.address!, BigInt(p.id)])
        if (!(balance > 0)) {
          addMessage(`[WARNING] Local position data is inconsistent with contract state. Position ${p.id} for pool ${p.uniswapPoolAddress} has zero balance. Position is now removed locally`, { color: 'yellow' })
          const removed = await removePosition(wallet.address!, p)
          if (!removed) {
            addMessage(`[WARNING] Unable to remove position ${p.id} for pool ${p.uniswapPoolAddress}`, { color: 'yellow' })
          }
          return
        }
        return { ...p, balance, utilization0: Number(u0) / ScalingFactor, utilization1: Number(u1) / ScalingFactor } satisfies PositionWithData
      }))
    })
    const sortedPositions = (await Promise.all(positionsPA)).flat()
      .filter(e => !!e)
      .toSorted((a, b) => {
        if (a.uniswapPoolAddress === b.uniswapPoolAddress) {
          return a.ts ?? 0 - (b.ts ?? 0)
        } else {
          return BigInt(a.uniswapPoolAddress) - BigInt(b.uniswapPoolAddress) > 0n ? 1 : -1
        }
      })
    setPositions(sortedPositions)
    return sortedPositions
  }, [client, panopticFactory, addMessage, wallet.address, uniswapPoolAddress])

  const addPosition = useCallback(async (position: Position): Promise<boolean | undefined> => {
    if (!wallet.address || !uniswapPoolAddress) {
      return undefined
    }
    const tokenId = calculateTokenId(position)
    const updated = await storePosition(wallet.address, position)
    const id: Hex = `0x${tokenId.toString(16)}`
    if (updated) {
      setPositions(ps =>
        [...ps, { ...position, id }].toSorted((a, b) => a.ts ?? 0 - (b.ts ?? 0))
      )
    }
    return updated
  }, [wallet.address, uniswapPoolAddress])

  useEffect(() => {
    reloadPositions().then(ps => {
      // if (!ps) {
      //   return
      // }
      // addMessage(`Loaded current positions: ${stringify(ps)}`)
    }).catch(ex => { addMessage((ex as Error).toString(), { color: 'red' }) })
  }, [addMessage, reloadPositions])

  return { positions, reloadPositions, addPosition, positionIds }
}
