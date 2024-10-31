import React, {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'
import { NotificationContext } from 'src/notification.js'
import { usePublicClient } from 'src/client.js'
import {
  type Address,
  getContract,
  type GetContractReturnType,
  type Hex,
  type PublicClient
} from 'viem'
import type { BigInt01, PositionWithData } from 'src/common.js'
import { MAX_V3POOL_TICK, MIN_V3POOL_TICK, SFPMAbi } from 'src/constants.js'
import {
  computeExercisedAmounts,
  stringify,
  unpack01,
  unpack01Signed
} from 'src/util.js'
import { defaultSFPMAddress } from 'src/config.js'

export type SFPM = GetContractReturnType<typeof SFPMAbi, PublicClient>

interface SFPMContextProps {
  simulateBurn: (
    pool: Address,
    position: PositionWithData
  ) => Promise<SimulateBurnResult | undefined>
  computeIntrinsicValue: (
    pool: Address,
    positions: PositionWithData[]
  ) => Promise<Record<Hex, BigInt01>>
  sfpm: SFPM | undefined
}

export const SFPMContext = createContext<SFPMContextProps>({
  simulateBurn: async (
    pool: Address,
    position: PositionWithData
  ): Promise<SimulateBurnResult | undefined> => {
    return undefined
  },
  computeIntrinsicValue: async (
    pool: Address,
    positions: PositionWithData[]
  ): Promise<Record<Hex, BigInt01>> => {
    return {}
  },
  sfpm: undefined
})

export interface SimulateBurnResult {
  totalCollected: BigInt01
  totalSwapped: BigInt01
  newTick: number
}

const useSFPMHook = () => {
  const { addMessage } = useContext(NotificationContext)
  const { client } = usePublicClient()
  const [sfpm, setSfpm] = useState<SFPM>()

  //  function burnTokenizedPosition(
  //       uint256 tokenId,
  //       uint128 positionSize,
  //       int24 slippageTickLimitLow,
  //       int24 slippageTickLimitHigh
  // )  returns (int256 totalCollected, int256 totalSwapped, int24 newTick)
  const simulateBurn = useCallback(
    async (
      pool: Address,
      position: PositionWithData
    ): Promise<SimulateBurnResult | undefined> => {
      if (!sfpm) {
        return
      }
      const tokenId = BigInt(position.id)
      const positionSize = position.balance ?? 0n
      const { result } = await sfpm.simulate.burnTokenizedPosition(
        [tokenId, positionSize, MAX_V3POOL_TICK - 1, MIN_V3POOL_TICK + 1],
        { account: pool }
      )
      const [totalCollectedPacked, totalSwappedPacked, newTick] = result as [
        bigint,
        bigint,
        number
      ]
      // addMessage(stringify({ totalCollectedPacked, totalSwappedPacked, newTick }))
      const totalCollected = unpack01Signed(totalCollectedPacked)
      const totalSwapped = unpack01Signed(totalSwappedPacked)
      // addMessage(stringify({ totalSwapped, totalCollected }))
      return { totalCollected, totalSwapped, newTick }
    },
    [sfpm]
  )

  const computeIntrinsicValue = useCallback(
    async (
      pool: Address,
      positions: PositionWithData[]
    ): Promise<Record<Hex, BigInt01>> => {
      const intrinsicValues: Record<Hex, BigInt01> = {}
      for (const p of positions) {
        const burnResult = await simulateBurn(pool, p)
        if (!burnResult) {
          continue
        }
        const amounts = computeExercisedAmounts(p)
        // addMessage(`amounts ${stringify(amounts)} positionSize ${p.balance}`)
        const { totalSwapped } = burnResult
        const token0 =
          totalSwapped.token0 - amounts.longs.token0 + amounts.shorts.token0
        const token1 =
          totalSwapped.token1 - amounts.longs.token1 + amounts.shorts.token1
        intrinsicValues[p.id] = { token0, token1 }
      }
      return intrinsicValues
    },
    [simulateBurn]
  )

  useEffect(() => {
    if (!client) {
      return
    }
    const init = async () => {
      if (!client) {
        return
      }
      const c = getContract({
        address: defaultSFPMAddress,
        abi: SFPMAbi,
        client
      })
      setSfpm(c)
    }
    init().catch((ex) => {
      addMessage((ex as Error).toString(), { color: 'red' })
    })
  }, [addMessage, client])

  return { sfpm, simulateBurn, computeIntrinsicValue }
}

export const SFPMProvider = ({ children }: PropsWithChildren) => {
  const { sfpm, simulateBurn, computeIntrinsicValue } = useSFPMHook()
  return (
    <SFPMContext.Provider value={{ sfpm, simulateBurn, computeIntrinsicValue }}>
      {children}
    </SFPMContext.Provider>
  )
}

export const useSFPM = () => useContext(SFPMContext)
