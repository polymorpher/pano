import React, { useCallback, useContext, useEffect, useState } from 'react'
import {
  AmountSelector,
  getUniswapPoolId, InProgressSelector,
  MultiChoiceSelector, type PositionWithData,
  SectionTitle, type TickSpacing, tokenIdToPosition, type ValidatedPair
} from 'src/common.js'
import { Box, Text } from 'ink'
import { useScanPositions } from './scan.js'
import { usePools } from '../pools/hooks/panoptic.js'
import { UserInputContext } from '../commands.js'
import { type Address, getContract } from 'viem'
import { PanopticPoolAbi, UniswapPoolAbi } from '../constants.js'
import { usePublicClient } from '../client.js'
import { useWallet } from '../wallet.js'
import { NotificationContext } from '../notification.js'
import { stringify } from '../util.js'
import parseDuration from 'parse-duration'
import humanizeDuration from 'humanize-duration'
import { storePosition } from '../db.js'
import { usePositions } from './hooks.js'
import { groupBy } from 'remeda'
import { PoolPositions } from './position.js'
import { SFPMProvider } from '../pools/sfpm.js'
export enum PortfolioStage {
  SelectAction = 1,
  SetScanDuration = 2,
  ScanInProgress = 3
}

export const PortfolioControl = () => {
  const { addMessage } = useContext(NotificationContext)
  const { wallet } = useWallet()
  const { pairs } = usePools()
  const { positions } = usePositions()
  const [positionsByPoolEntries, setPositionsByPoolEntries] = useState<Array<[Address, PositionWithData[]]>>([])
  const { client, archiveClient } = usePublicClient()
  const { scan } = useScanPositions()
  const { setDisabled: setUserCommandDisabled } = useContext(UserInputContext)
  const [filteredPairs, setFilteredPairs] = useState<Array<[ValidatedPair, bigint]>>([])
  const poolIdMapping: Record<string, Address> = Object.fromEntries(filteredPairs.map(([p]) => [getUniswapPoolId(p.uniswapPoolAddress).toString(16), p.uniswapPoolAddress]))
  const [stage, setStage] = useState<PortfolioStage>(PortfolioStage.SelectAction)
  const [scanInterrupt, setScanInterrupt] = useState<boolean>(false)
  useEffect(() => {
    const positionsByPool = groupBy(positions, p => p.uniswapPoolAddress) as Record<Address, PositionWithData[]>
    const positionsByPoolEntries = Object.entries(positionsByPool) as Array<[Address, PositionWithData[]]>
    addMessage('pool positions set')
    setPositionsByPoolEntries(positionsByPoolEntries)
  }, [positions])
  useEffect(() => {
    async function init () {
      if (!client || !wallet.address) {
        return
      }
      const numPositionsArrayP = pairs.map(async p => {
        const pp = getContract({ address: p.panopticPoolAddress, abi: PanopticPoolAbi, client })
        const n = await pp.read.numberOfPositions([wallet.address!])
        return [p, n]
      })
      const numPositionsArray = await Promise.all(numPositionsArrayP) as Array<[ValidatedPair, bigint]>
      const filteredPairs = numPositionsArray.filter(([, numPositions]) => numPositions > 0n)
      setFilteredPairs(filteredPairs)
    }
    init().catch(ex => { addMessage((ex as Error).toString(), { color: 'red' }) })
  }, [filteredPairs, addMessage, wallet.address, scan, client, pairs])

  const doScan = useCallback(async (duration: number) => {
    if (!client || !archiveClient || !wallet.address) {
      return
    }
    addMessage(`Found ${filteredPairs.length} pools with open positions`)
    for (const [pair, numPositions] of filteredPairs) {
      addMessage(`Scanning pool ${pair.token0}/${pair.token1} which you have ${numPositions} open positions`)
      const up = getContract({ address: pair.uniswapPoolAddress, abi: UniswapPoolAbi, client })
      const tickSpacing = await up.read.tickSpacing() as TickSpacing
      let subtotal = 0
      // addMessage(`scanDuration=${duration}`)
      await scan(pair.panopticPoolAddress, duration, async (update, error): Promise<boolean> => {
        if (error ?? !update) {
          addMessage(`Error encounterd during scan: ${error}`, { color: 'red' })
          return true
        }
        // addMessage(stringify(update))
        if (update.numBlocksScanned === 0n) {
          // first update has 0 entry
          const fromTime = Number((await archiveClient.getBlock({ blockNumber: update.firstBlock })).timestamp) * 1000
          const toTime = Number((await archiveClient.getBlock({ blockNumber: update.finalBlock })).timestamp) * 1000
          addMessage(`Scanning from block ${update.firstBlock} to ${update.finalBlock} | from ${new Date(fromTime).toLocaleString()} to ${new Date(toTime).toLocaleString()}`, { color: 'green' })
          return true
        }
        const percDone = (Number(update.totalBlocks) / Number(update.totalBlocks) * 100).toFixed(2)
        addMessage(`- [${percDone}% ${Number(update.totalBlocks)}/${Number(update.totalBlocks)}] Finished chunk ${update.fromBlock} to ${update.toBlock}. Found ${update.entries.length} positions`)
        for (const entry of update.entries) {
          const position = tokenIdToPosition(entry.tokenId, tickSpacing, poolIdMapping)
          position.ts = Number(entry.blockTimestamp) * 1000
          const added = await storePosition(wallet.address!, position, entry.tick)
          if (added) {
            addMessage(`Synced new position: ${stringify(position)}`)
          } else if (added === undefined) {
            addMessage(`Internal error - unable to sync position: ${stringify(position)}`)
          } else {
            addMessage(`Skipped position - already exist: ${stringify(position)}`)
          }
        }
        if (!subtotal) {
          subtotal = Number(update.totalBlocks)
        }
        return !scanInterrupt
      })
      addMessage(`Pool ${pair.token0}/${pair.token1} (${pair.panopticPoolAddress}) scan completed. ${Number(subtotal)} blocks scanned`, { color: 'green' })
      setStage(PortfolioStage.SelectAction)
    }
    setScanInterrupt(false)
  }, [archiveClient, scanInterrupt, wallet.address, poolIdMapping, filteredPairs, addMessage, scan, client])

  const onAction = useCallback(async (choice: number) => {
    if (choice === 1) {
      setStage(PortfolioStage.SetScanDuration)
    }
  }, [])

  const onDurationSubmit = useCallback(async (input: string) => {
    const n = Number(input)
    if (n) {
      addMessage(`Starting scan over the past ${n} blocks...`)
      await doScan(-Math.abs(n))
      return
    }
    const d = parseDuration(input)
    if (!d) {
      addMessage('Invalid duration input', { color: 'red' })
      return
    }
    addMessage(`Starting scan over the past ${humanizeDuration(d)}`)
    await doScan(Math.abs(d))
  }, [addMessage, doScan])

  const onScanInterrupted = useCallback(async () => {
    setScanInterrupt(true)
    addMessage('Terminating scan...')
  }, [addMessage])

  return <SFPMProvider>
    <Box flexDirection={'column'}>
      <SectionTitle>Portfolio and Positions</SectionTitle>
      {filteredPairs.map(([p, n]) => {
        return <Text key={p.panopticPoolAddress}>Pool {p.token0}/{p.token1}: {n.toString()} open positions</Text>
      })}
      {positionsByPoolEntries.map(([uniswapPoolAddress, poolPositions]) => {
        return <PoolPositions key={uniswapPoolAddress} uniswapPoolAddress={uniswapPoolAddress} poolPositions={poolPositions}/>
      })}
      {stage === PortfolioStage.SelectAction &&
      <MultiChoiceSelector options={[
        'Sync positions on chain'
      ]} onSelected={onAction}
       onExit={() => { setUserCommandDisabled(false) }} prompt={'Choose an action'}
       intro={<Box marginY={1} flexDirection={'column'}>
         <Text>If you experience errors in buying or selling options, your positions might need to be re-synced with the data on-chain .</Text>
       </Box>}
    />}
      {stage === PortfolioStage.SetScanDuration &&
      <AmountSelector
      intro={'Scan for how far back?'}
      prompt={'Enter the time duration (e.g. 10s, 5h, 3d, 1m, ... or in number of blocks, e.g. 1024)'}
      onRawSubmit={onDurationSubmit}
      onBack={() => { setStage(PortfolioStage.SelectAction) }}
      />}
      {stage === PortfolioStage.ScanInProgress &&
      <InProgressSelector intro={'Scan in progress...'} onExit={onScanInterrupted}/>}

    </Box>
  </SFPMProvider>
}
