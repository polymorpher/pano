import fs from 'fs/promises'
import path from 'path'
import * as process from 'process'

const CONTRACTS_IN =
  process.env.CONTRACTS_OUT ?? '../panoptic-v1-core/artifacts/contracts'
const TYPES_OUT = process.env.TYPES_OUT ?? './types-contract'

function tryParse(str: string): any {
  try {
    return JSON.parse(str)
  } catch (ex: any) {
    console.error(ex)
    return undefined
  }
}

async function main() {
  const sols = await fs.readdir(CONTRACTS_IN)
  for (const sol of sols) {
    if (!sol.endsWith('.sol')) {
      console.log(`Skipped directory ${path.join(CONTRACTS_IN, sol)}`)
      continue
    }
    const jsons = await fs.readdir(path.join(CONTRACTS_IN, sol))
    for (const json of jsons) {
      const ip = path.join(CONTRACTS_IN, sol, json)
      console.log(`Reading ${ip}`)
      const content = await fs.readFile(ip, { encoding: 'utf-8' })

      const abi = tryParse(content)?.abi
      if (!abi?.length) {
        console.error(`Error parsing ${ip} or it is empty. Skipped`)
        continue
      }
      const src = `export default ${JSON.stringify(abi, null, 2)} as const`
      const op = path.join(TYPES_OUT, sol, json + '.ts')
      await fs.mkdir(path.join(TYPES_OUT, sol), { recursive: true })
      await fs.writeFile(path.join(TYPES_OUT, sol, json + '.ts'), src)
      console.log(`Wrote ${op}`)
    }
  }
}

main().catch(console.error)
