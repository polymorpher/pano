import PouchDB from 'pouchdb'
import { defaultDbPath } from './config.js'
import { cmd } from './cmd.js'
import { type Address } from 'viem'
import { calculateTokenId, extractPoolId, getPoolId, type Position, type PositionWithId } from './common.js'
const dbPath = (cmd.db ?? defaultDbPath) as string

export const db = new PouchDB(dbPath)

// making use of Panoptic SDK to convert to and from tokenId. The implementation can be moved or replicated in this project instead
// since we are not really using the SDK for its intended purpose (interacting with Panoptic contracts)

const POSITIONS = 'positions'

const END_MARK = '\ufff0'

const makeKey = (...paths: string[]) => {
  return paths.join('/')
}

export async function getPosition (address: Address, tokenId: bigint): Promise<Position> {
  const poolId = extractPoolId(tokenId)
  const id = makeKey(address, POSITIONS, poolId.toString(16), tokenId.toString(16))
  const d = await db.get<Position>(id)
  const { uniswapPoolAddress, tickSpacing, legs, ts } = d
  return { uniswapPoolAddress, tickSpacing, legs, ts }
}

export async function positionExists (address: Address, tokenId: bigint): Promise<boolean> {
  try {
    await getPosition(address, tokenId)
    return true
  } catch (ex: any) {
    return false
  }
}

export async function readPositions (address: Address, uniswapPool?: Address): Promise<PositionWithId[]> {
  const startkey = uniswapPool ? makeKey(address, POSITIONS, getPoolId(uniswapPool).toString(16)) : makeKey(address, POSITIONS)
  const docs = await db.allDocs<Position>({
    startkey,
    endkey: startkey + END_MARK
  })
  return docs.rows.map(d => {
    if (!d.doc) {
      return undefined
    }
    const { uniswapPoolAddress, tickSpacing, legs, _id, ts } = d.doc
    return { uniswapPoolAddress, tickSpacing, legs, id: BigInt(`0x${_id}`), ts }
  }).filter(e => e !== undefined) as PositionWithId[]
}

export async function getPositionIdList (address: Address, uniswapPool?: Address): Promise<bigint[]> {
  const positions = await readPositions(address, uniswapPool)
  return positions.map(p => p.id)
}

export async function storePosition (address: Address, position: Position): Promise<boolean> {
  const tokenId = calculateTokenId(position)
  const poolId = getPoolId(position.uniswapPoolAddress)
  const _id = makeKey(address, POSITIONS, poolId.toString(16), tokenId.toString(16))
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
    ts: Date.now()
  }
  await db.put<Position>(doc)
  return true
}
