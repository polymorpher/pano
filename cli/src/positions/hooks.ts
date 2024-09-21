import { type Address, type Hex } from 'viem'
import { useCallback, useState, useEffect, useContext } from 'react'
import { calculateTokenId, type Position, type PositionWithData } from '../common.js'
import { readPositions, storePosition } from '../db.js'
import { useWallet } from '../wallet.js'
import { NotificationContext } from '../notification.js'
import { usePoolContract } from '../pools/hooks.js'
import { ScalingFactor } from '../util.js'

export const usePositions = (uniswapPoolAddress?: Address) => {
  const { wallet } = useWallet()
  const { addMessage } = useContext(NotificationContext)
  const [positions, setPositions] = useState<PositionWithData[]>([])
  const positionIds = positions.map(p => BigInt(p.id))
  const { panopticPool } = usePoolContract(uniswapPoolAddress)
  const reloadPositions = useCallback(async () => {
    if (!wallet.address || !uniswapPoolAddress || !panopticPool) {
      return
    }
    const ps = await readPositions(wallet.address, uniswapPoolAddress)
    const positionBalancesP: Array<Promise<PositionWithData | undefined>> = ps.map(async p => {
      const [balance, u0, u1] = await panopticPool.read.optionPositionBalance([wallet.address!, BigInt(p.id)])
      if (!(balance > 0)) {
        addMessage(`[WARNING] Local position data is inconsistent with contract state. Position ${p.id} for pool ${uniswapPoolAddress} has zero balance. Position is now removed locally`, { color: 'yello' })
        return
      }
      return { ...p, balance, utilization0: Number(u0) / ScalingFactor, utilization1: Number(u1) / ScalingFactor }
    })
    const positions = (await Promise.all(positionBalancesP)).filter(e => e !== undefined)
    const sortedPositions = positions.toSorted((a, b) => a.ts ?? 0 - (b.ts ?? 0))
    setPositions(sortedPositions)
    return sortedPositions
  }, [addMessage, panopticPool, wallet.address, uniswapPoolAddress])

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
      if (!ps) {
        return
      }
      addMessage(`Loaded current positions: ${JSON.stringify(ps)}`)
    }).catch(ex => { addMessage((ex as Error).toString(), { color: 'red' }) })
  }, [addMessage, reloadPositions])

  return { positions, reloadPositions, addPosition, positionIds }
}
