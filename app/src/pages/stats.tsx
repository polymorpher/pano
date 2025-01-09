import { usePools } from '../../../cli/src/pools/hooks/panoptic.js'

const Stats = () => {
  const { pairs } = usePools()

  return (
    <Box flexDirection="column">
      <SectionTitle>Available Option Trading Pools</SectionTitle>
      {pairs?.length === 0 && <Text>No pools</Text>}
      {pairs?.map((pair) => {
        return <PoolStats key={pair.panopticPoolAddress} pair={pair} />
      })}
    </Box>
  )
}

export default Stats