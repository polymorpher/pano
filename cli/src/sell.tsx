import React, { useCallback, useContext, useEffect, useState } from 'react'
import { db } from './db'
import { useWallet } from './wallet.js'
import { useWalletClient } from './client.js'
import { usePools, usePoolStats } from './pools.js'
import { NotificationContext } from './notification.js'
import type { ValidatedPair } from './common.js'

enum Stage {
  PoolSelection = 1,
  Spec = 2,
  Confirm = 3
}

export const SellControl = () => {
  // TODO: make below statements a single hook
  const { wallet } = useWallet()
  const { client } = useWalletClient()
  const { pairs } = usePools()
  const { addMessage } = useContext(NotificationContext)
  const [textInput, setTextInput] = useState<string>('')
  const [chosenPair, setChosenPair] = useState<ValidatedPair>()
  const chosenPairInfo = usePoolStats(chosenPair)

  const [stage, setStage] = useState<Stage>(Stage.PoolSelection)
}
