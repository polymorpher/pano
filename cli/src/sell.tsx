import React, { useCallback, useContext, useEffect, useState } from 'react'
import { db } from './db'
import { useWallet } from './wallet.js'
import { useWalletClient } from './client.js'
import { usePools, usePoolStats } from './pools.js'
import { NotificationContext } from './notification.js'
import type { ValidatedPair } from './common.js'
import TextInput from 'ink-text-input'
import { Box, Text } from 'ink'


enum Stage {
  PoolSelection = 1,
  Strike = 2,
  Width = 3,
  Quantity = 4,
  Confirm = 5
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

  return <Box flexDirection={'column'}>
  </Box>
}
