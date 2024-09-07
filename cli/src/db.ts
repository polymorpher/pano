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
  const { uniswapPoolAddress, tickSpacing, legs } = d
  return { uniswapPoolAddress, tickSpacing, legs }
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
    const { uniswapPoolAddress, tickSpacing, legs, _id } = d.doc
    return { uniswapPoolAddress, tickSpacing, legs, id: BigInt(`0x${_id}`) }
  }).filter(e => e !== undefined) as PositionWithId[]
}

export async function getPositionIdList (address: Address, uniswapPool?: Address): Promise<bigint[]> {
  const positions = await readPositions(address, uniswapPool)
  return positions.map(p => p.id)
}

export async function storePosition (address: Address, position: Position): Promise<void> {
  const tokenId = calculateTokenId(position.uniswapPoolAddress, position.tickSpacing, position.legs)
  const poolId = getPoolId(position.uniswapPoolAddress)
  const _id = makeKey(address, POSITIONS, poolId.toString(16), tokenId.toString(16))
  const { uniswapPoolAddress, tickSpacing, legs } = position
  const doc = {
    _id,
    uniswapPoolAddress,
    tickSpacing,
    legs
  }
  await db.put(doc)
}
