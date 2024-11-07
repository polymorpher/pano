import { useCallback, useRef } from 'react'
import PouchDB from 'pouchdb'
import { defaultDbPath } from './config.js'
import { type Address, type Hex } from 'viem'
import {
  calculateTokenId,
  extractPoolId,
  getPoolId,
  type Position,
  type PositionWithId
} from './common.js'
import { useOption } from './commands.js'

// making use of Panoptic SDK to convert to and from tokenId. The implementation can be moved or replicated in this project instead
// since we are not really using the SDK for its intended purpose (interacting with Panoptic contracts)

const POSITIONS = 'positions'

const END_MARK = '\ufff0'

const makeKey = (...paths: string[]) => {
  return paths.join('/')
}

interface IdData {
  tokenId: bigint
  poolId: bigint
  id: string
}

function buildId(address: Address, position: Position): IdData {
  const tokenId = calculateTokenId(position)
  const poolId = getPoolId(position.uniswapPoolAddress)
  return {
    id: makeKey(address, POSITIONS, poolId.toString(16), tokenId.toString(16)),
    tokenId,
    poolId
  }
}

interface RemovalResult {
  id: string
  removed: boolean
  error?: string
}

interface BulkRemovalResult {
  results: Record<string, RemovalResult>
  error?: Error
}

const useDb = () => {
  const dbPath = useOption('db') ?? defaultDbPath
  const db = useRef(new PouchDB(dbPath))

  const getPosition = useCallback(
    (address: Address, tokenId: bigint): Promise<Position> => {
      const poolId = extractPoolId(tokenId)
      const id = makeKey(
        address,
        POSITIONS,
        poolId.toString(16),
        tokenId.toString(16)
      )
      return db.current.get<Position>(id)
    },
    []
  )

  const readPositions = useCallback(
    async (
      address: Address,
      uniswapPool?: Address
    ): Promise<PositionWithId[]> => {
      const startkey = uniswapPool
        ? makeKey(address, POSITIONS, getPoolId(uniswapPool).toString(16))
        : makeKey(address, POSITIONS)

      const docs = await db.current.allDocs<Position>({
        startkey,
        endkey: startkey + END_MARK,
        include_docs: true
      })

      return docs.rows
        .map((d) => {
          if (!d.doc) {
            return undefined
          }
          const { uniswapPoolAddress, tickSpacing, legs, _id, ts } = d.doc
          const parts = _id.split('/')
          const id = parts[parts.length - 1]
          return { uniswapPoolAddress, tickSpacing, legs, id: `0x${id}`, ts }
        })
        .filter((e) => e !== undefined) as PositionWithId[]
    },
    []
  )

  const positionExists = useCallback(
    async (address: Address, tokenId: bigint): Promise<boolean> => {
      try {
        await getPosition(address, tokenId)
        return true
      } catch (ex: any) {
        return false
      }
    },
    [getPosition]
  )

  const storePosition = useCallback(
    async (
      address: Address,
      position: Position,
      atTick: number
    ): Promise<boolean> => {
      const { tokenId, id: _id } = buildId(address, position)
      const hasPosition = await positionExists(address, tokenId)
      if (hasPosition) {
        return false
      }
      const { uniswapPoolAddress, tickSpacing, legs } = position
      const doc = {
        _id,
        uniswapPoolAddress,
        tickSpacing,
        legs,
        atTick,
        ts: position.ts ?? Date.now()
      }
      return await db.current.put<Position>(doc).then(() => true)
    },
    [positionExists]
  )

  const removePosition = useCallback(
    async (address: Address, position: Position): Promise<boolean> => {
      const { id: _id } = buildId(address, position)
      try {
        const p = await db.current.get<Position>(_id)
        const response = await db.current.remove(p)
        return response.ok
      } catch (ex: any) {
        return false
      }
    },
    []
  )

  const getPositionIdList = useCallback(
    async (address: Address, uniswapPool?: Address): Promise<Hex[]> => {
      const positions = await readPositions(address, uniswapPool)
      return positions.map((p) => p.id)
    },
    []
  )

  // TODO: test, then use this instead of single removals in position management
  const bulkRemovePositions = useCallback(
    async (
      address: Address,
      positions: Position[]
    ): Promise<BulkRemovalResult> => {
      const results: Record<string, RemovalResult> = {}
      try {
        const ids = positions.map((p) => buildId(address, p)).map((e) => e.id)
        const r1 = await db.current.allDocs<Position>({ keys: ids })

        const docs = r1.rows
          .map((row) => {
            const re = row as { key: string; error?: string }
            if (re.error) {
              results[re.key] = { id: re.key, removed: false, error: re.error }
              return undefined
            }
            const rr = row as { id: string; value: { rev: string } }
            return { _id: rr.id, _rev: rr.value.rev, _deleted: true }
          })
          .filter((e) => !!e) as Array<{
          _id: string
          _rev: string
          _deleted: true
        }>
        const response = await db.current.bulkDocs(docs)
        response.forEach((r, index) => {
          const re = r as { message?: string; error?: boolean }
          if (re.error) {
            results[docs[index]._id] = {
              id: docs[index]._id,
              removed: false,
              error: re.message
            }
            return
          }
          const rr = r as { ok: boolean; id: string }
          results[rr.id] = { id: rr.id, removed: true }
        })
        return { results }
      } catch (err) {
        return { results, error: err as Error }
      }
    },
    []
  )

  return {
    readPositions,
    storePosition,
    removePosition
  }
}

export default useDb
