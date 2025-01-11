import path from 'path'
import fs from 'fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import topLevelAwait from 'vite-plugin-top-level-await'

// https://vite.dev/config/
export default defineConfig(() => {
  fs.copyFileSync('./node_modules/yoga-wasm-web/dist/yoga.wasm', './node_modules/.vite/deps/yoga.wasm')
  
  return {
    define: {
      '__dirname': '""',
      'process.env': {},
      'process.stdout': '() => {}',
      'process.cwd': '() => ""',
      'process.argv': '["", ""]',
      'process.versions.electron': '() => false'
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@cli': path.resolve(__dirname, '../cli/src'),
      },
    },
    plugins: [
      react(),
      nodePolyfills({
        globals: {
          process: false,
        },
        include: ['path', 'process', 'util', 'assert', 'events']
      }),
      topLevelAwait({
        promiseExportName: '__tla',
        promiseImportName: i => `__tla_${i}`
      })
    ]
  }
})
