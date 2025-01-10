import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import topLevelAwait from 'vite-plugin-top-level-await'

// https://vite.dev/config/
export default defineConfig({
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
      include: ['path', 'process', 'util', 'assert']
    }),
    topLevelAwait({
      promiseExportName: '__tla',
      promiseImportName: i => `__tla_${i}`
    })
  ]
})
