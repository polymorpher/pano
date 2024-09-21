// Scans for event log in past blocks, and identify pre-existing option positions that are not stored locally. Update local database as the scan progresses

import { usePublicClient } from 'src/client.js'
import { useWallet } from '../wallet.js'
import { useContext, useEffect, useCallback } from 'react'
import { NotificationContext } from '../notification.js'
import { archivePoolingBlockRangeSize, archivePoolingInterval } from '../config.js'
import { type Address, parseAbiItem } from 'viem'
import { extractLR64, type Position } from '../common.js'
import { ScalingFactor, stringify } from '../util.js'

const OptionMinted = parseAbiItem('event OptionMinted(address indexed recipient, uint128 positionSize, uint256 indexed tokenId, int24 tickAtMint, uint128 poolUtilizations)')

export interface OptionMintEntry {
  tokenId: bigint
  positionSize: bigint
  tick: number
  utilization0: number
  utilization1: number
  recipient: Address
  blockNumber: bigint
  blockTimestamp: bigint
}

export interface ScanUpdate {
  entries: OptionMintEntry[]
  fromBlock: bigint
  firstBlock: bigint
  toBlock: bigint
  finalBlock: bigint
  numBlocksScanned: bigint
  totalBlocks: bigint
}

interface UseScanPositionsOptions {
  blockRangeSize?: bigint
  poolingInterval?: number
  blockTime?: number
}

export const useScanPositions = (options?: UseScanPositionsOptions) => {
  const { archiveClient, network } = usePublicClient()
  const { addMessage } = useContext(NotificationContext)
  const { wallet } = useWallet()
  const scan = useCallback(async (panopticPoolAddress: Address, duration: number, onChunkScanned: (update: ScanUpdate | undefined, error?: Error) => Promise<boolean>) => {
    if (!wallet.address || !archiveClient) {
      // addMessage(`No wallet address or archiveClient ${wallet.address} | ${archiveClient}`)
      return
    }
    const finalBlock = await archiveClient.getBlockNumber()
    const blockTime = options?.blockTime ?? network.blockTime
    const firstBlock = duration < 0 ? (finalBlock + BigInt(duration)) : (finalBlock - BigInt(blockTime && blockTime > 0 ? Math.ceil(duration / blockTime) : duration))
    const poolingInterval = options?.poolingInterval ?? archivePoolingInterval
    const blockRangeSize = options?.blockRangeSize ?? archivePoolingBlockRangeSize
    if (!await onChunkScanned({ entries: [], fromBlock: 0n, toBlock: 0n, firstBlock, finalBlock, numBlocksScanned: 0n, totalBlocks: finalBlock - firstBlock })) {
      return
    }
    for (let b = firstBlock; b < finalBlock; b += blockRangeSize) {
      const toBlock = finalBlock < b + blockRangeSize ? finalBlock : b + blockRangeSize
      const fromBlock = b
      try {
        const logs = await archiveClient.getLogs({
          address: panopticPoolAddress,
          event: OptionMinted,
          args: { recipient: wallet.address },
          fromBlock,
          toBlock
        })
        const timestampsEntries: Array<[string, bigint]> = await Promise.all(logs.map(async log => {
          const b = await archiveClient.getBlock({ blockNumber: log.blockNumber })
          return [BigInt(log.blockNumber).toString(16), b.timestamp]
        }))
        const timestampMapping = Object.fromEntries(timestampsEntries)
        const entries = logs.map(log => {
          const { recipient, tokenId, positionSize, tickAtMint, poolUtilizations } = log.args
          const { blockNumber } = log
          const blockTimestamp = timestampMapping[blockNumber.toString(16)]

          if (!recipient || !tokenId || !positionSize || !tickAtMint || !poolUtilizations || !blockTimestamp) {
            // addMessage(`- Skipping entry (missing some fields): ${stringify(logs)}`)
            return undefined
          }
          const [u1n, u0n] = extractLR64(poolUtilizations)
          const utilization0 = Number(u0n) / ScalingFactor
          const utilization1 = Number(u1n) / ScalingFactor

          const entry: OptionMintEntry = { recipient, tokenId, positionSize, tick: tickAtMint, utilization0, utilization1, blockNumber, blockTimestamp }
          return entry
        }).filter(e => !!e)
        // addMessage(`- Scanned chunk ${fromBlock} to ${toBlock}, logs: ${stringify(logs)}`)
        const shouldContinue = await onChunkScanned({ entries, firstBlock, finalBlock, fromBlock, toBlock, totalBlocks: finalBlock - firstBlock, numBlocksScanned: toBlock - firstBlock })
        if (!shouldContinue) {
          return
        }
        await new Promise((resolve) => setTimeout(resolve, poolingInterval))
      } catch (ex: any) {
        const shouldContinue = await onChunkScanned(undefined, ex as Error)
        if (!shouldContinue) {
          return
        }
      }
    }
  }, [options, network, wallet.address, archiveClient])
  return { scan }
}
