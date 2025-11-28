import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      'tailwindcss/version.js': path.resolve(__dirname, 'node_modules/tailwindcss/package.json')
    }
  },
  server: {
    historyApiFallback: true
  },
  preview: {
    historyApiFallback: true
  }
})
