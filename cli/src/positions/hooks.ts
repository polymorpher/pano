import { type Address, getContract, type GetContractReturnType, type PublicClient, zeroAddress } from 'viem'
import { useCallback, useState, useEffect, useContext } from 'react'
import { calculateTokenId, type Position, type PositionWithId } from '../common.js'
import { readPositions, storePosition } from '../db.js'
import { useWallet } from '../wallet.js'
import { NotificationContext } from '../notification.js'

export const usePositions = (poolAddress?: Address) => {
  const { wallet } = useWallet()
  const { addMessage } = useContext(NotificationContext)
  const [positions, setPositions] = useState<PositionWithId[]>([])
  const reloadPositions = useCallback(async () => {
    if (!wallet.address || !poolAddress) {
      return
    }
    const ps = await readPositions(wallet.address, poolAddress)
    setPositions(ps.toSorted((a, b) => a.ts ?? 0 - (b.ts ?? 0)))
  }, [wallet.address, poolAddress])

  const addPosition = useCallback(async (position: Position) => {
    if (!wallet.address || !poolAddress) {
      return
    }
    const id = calculateTokenId(position)
    const updated = await storePosition(wallet.address, position)
    if (updated) {
      setPositions(ps => [...ps, { ...position, id }].toSorted((a, b) => a.ts ?? 0 - (b.ts ?? 0)))
    }
  }, [wallet.address, poolAddress])

  useEffect(() => {
    if (!wallet.address) {
      return
    }
    readPositions(wallet.address, poolAddress)
      .then(ps => {
        setPositions(ps)
        addMessage(`Current positions: ${JSON.stringify(ps)}`)
      })
      .catch(ex => { addMessage((ex as Error).toString(), { color: 'red' }) })
  }, [addMessage, wallet.address, poolAddress])

  return { positions, reloadPositions, addPosition }
}
