import { useContext, useState, useCallback } from 'react'
import { useWallet } from '../wallet.js'
import { useWalletClient } from '../client.js'
import { NotificationContext } from '../notification.js'
import type { ValidatedPair } from '../common.js'
import { usePoolStats } from '../pools/hooks.js'
import { TradeStage } from './trade.js'
import { UserInputContext } from '../commands.js'

export const useTrade = () => {
  const { wallet } = useWallet()
  const { client } = useWalletClient()
  const { addMessage } = useContext(NotificationContext)
  const [chosenPair, setChosenPair] = useState<ValidatedPair>()
  const chosenPairInfo = usePoolStats(chosenPair)
  const [stage, setStage] = useState<TradeStage>(TradeStage.PoolSelection)
  const { setDisabled: setUserCommandDisabled } = useContext(UserInputContext)
  const exit = useCallback(() => {
    setStage(TradeStage.PoolSelection)
    setUserCommandDisabled(false)
  }, [setUserCommandDisabled])
  const onPoolSelected = ({ pair }: { text: string, pair?: ValidatedPair }) => {
    if (!pair) {
      setChosenPair(undefined)
      return
    }
    setChosenPair(pair)
    setStage(TradeStage.QuoteAsset)
  }

  return { stage, setStage, chosenPairInfo, chosenPair, setChosenPair, client, wallet, addMessage, onPoolSelected, exit }
}
