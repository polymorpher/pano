import { useContext, useState } from 'react'
import { useWallet } from '../wallet.js'
import { useWalletClient } from '../client.js'
import { NotificationContext } from '../notification.js'
import type { ValidatedPair } from '../common.js'
import { usePoolStats } from '../pools/hooks.js'
import { TradeStage } from './trade.js'

export const useTrade = () => {
  const { wallet } = useWallet()
  const { client } = useWalletClient()
  const { addMessage } = useContext(NotificationContext)
  const [chosenPair, setChosenPair] = useState<ValidatedPair>()
  const chosenPairInfo = usePoolStats(chosenPair)
  const [stage, setStage] = useState<TradeStage>(TradeStage.PoolSelection)

  const onPoolSelected = ({ pair }: { text: string, pair?: ValidatedPair }) => {
    if (!pair) {
      setChosenPair(undefined)
      return
    }
    setChosenPair(pair)
    setStage(TradeStage.QuoteAsset)
  }

  return { stage, setStage, chosenPairInfo, chosenPair, setChosenPair, client, wallet, addMessage, onPoolSelected }
}
