// Scans for event log in past blocks, and identify pre-existing option positions that are not stored locally. Update local database as the scan progresses

import { usePublicClient } from 'src/client.js'
import { useWallet } from '../wallet.js'
import { useContext, useEffect, useCallback } from 'react'
import { NotificationContext } from '../notification.js'
import { archivePoolingBlockRangeSize, archivePoolingInterval } from '../config.js'
import { type Address, parseAbiItem } from 'viem'
import { type Position } from '../common.js'
import { stringify } from '../util.js'

const OptionMinted = parseAbiItem('event OptionMinted(address indexed recipient, uint128 positionSize, uint256 indexed tokenId, int24 tickAtMint, uint128 poolUtilizations)')

export interface OptionMintEntry {
  tokenId: bigint
  balance: bigint
  tick: number
  utilization: number
  recipient: Address
  fromBlock: bigint
  toBlock: bigint
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
  const scan = useCallback(async (panopticPoolAddress: Address, duration: number, onChunkScanned: (entries: OptionMintEntry[] | undefined, error?: Error) => any) => {
    if (!wallet.address || !archiveClient) {
      // addMessage(`No wallet address or archiveClient ${wallet.address} | ${archiveClient}`)
      return
    }
    const finalBlock = await archiveClient.getBlockNumber()
    const blockTime = options?.blockTime ?? network.blockTime
    const firstBlock = finalBlock - BigInt(blockTime && blockTime > 0 ? Math.ceil(duration / blockTime) : duration)
    const fromTime = Number((await archiveClient.getBlock({ blockNumber: firstBlock })).timestamp) * 1000
    const toTime = Number((await archiveClient.getBlock({ blockNumber: finalBlock })).timestamp) * 1000
    addMessage(`Scanning from block ${firstBlock} to ${finalBlock} (from ${new Date(fromTime).toLocaleString()}) to ${new Date(toTime).toLocaleString()}`)
    const poolingInterval = options?.poolingInterval ?? archivePoolingInterval
    const blockRangeSize = options?.blockRangeSize ?? archivePoolingBlockRangeSize
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
        addMessage(`- scanned chunk ${fromBlock} to ${toBlock}, logs: ${stringify(logs)}`)
        onChunkScanned([])
        await new Promise((resolve) => setTimeout(resolve, poolingInterval))
      } catch (ex: any) {
        addMessage((ex as Error).toString(), { color: 'red' })
        onChunkScanned(undefined, ex as Error)
      }
    }
    addMessage('Scan completed')
  }, [options, network, wallet.address, archiveClient, addMessage])
  return { scan }
}
