import React, { useCallback, useContext, useEffect, useState } from 'react'
import {
  MultiChoiceSelector,
  SectionTitle, type ValidatedPair
} from 'src/common.js'
import { Box, Text } from 'ink'
import { useScanPositions } from './scan.js'
import { usePools } from '../pools/hooks.js'
import { UserInputContext } from '../commands.js'
import { getContract } from 'viem'
import { PanopticPoolAbi } from '../constants.js'
import { usePublicClient } from '../client.js'
import { useWallet } from '../wallet.js'
import { NotificationContext } from '../notification.js'

export const PortfolioControl = () => {
  const { addMessage } = useContext(NotificationContext)
  const { wallet } = useWallet()
  const { pairs } = usePools()
  const { client } = usePublicClient()
  const { scan } = useScanPositions()
  const { setDisabled: setUserCommandDisabled } = useContext(UserInputContext)
  const [filteredPairs, setFilteredPairs] = useState<ValidatedPair[]>([])

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
      const filteredPairs = numPositionsArray.filter(([, numPositions]) => numPositions > 0n).map(e => e[0])
      setFilteredPairs(filteredPairs)
    }
    init().catch(ex => { addMessage((ex as Error).toString(), { color: 'red' }) })
  }, [filteredPairs, addMessage, wallet.address, scan, client, pairs])

  const onAction = useCallback(async (choice: number) => {
    if (choice === 1) {
      addMessage(`filteredPairs: ${JSON.stringify(filteredPairs)}`)
      for (const pair of filteredPairs) {
        await scan(pair.panopticPoolAddress, 3600 / 15 * 24, () => {})
      }
    }
  }, [filteredPairs, addMessage, scan])

  return <Box flexDirection={'column'}>
    <SectionTitle>Portfolio and Positions</SectionTitle>
    {filteredPairs.map(p => {
      return <Text key={p.panopticPoolAddress}>Filtered Pair: {JSON.stringify(p)}</Text>
    })}
    <MultiChoiceSelector options={[
      'Sync positions on chain'
    ]} onSelected={onAction} onExit={() => { setUserCommandDisabled(false) }} prompt={'Choose an action'}
       intro={<Box marginY={1} flexDirection={'column'}>
         <Text>Your positions might need to be re-synced with the data on-chain if you experience errors in buying or selling options.</Text>
       </Box>}
      />
  </Box>
}
