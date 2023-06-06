import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    jsxImportSource: "@emotion/react",
    babel: {
      plugins: ["@emotion/babel-plugin"],
    },
  })],
  server: {
    port: 5170,
  },
  resolve:{
    alias:{
      "api": `${path.resolve(__dirname, './src/api')}`,
      "assets": `${path.resolve(__dirname, './src/assets')}`,
      "components": `${path.resolve(__dirname, './src/components')}`,
      "store": `${path.resolve(__dirname, './src/store')}`,
      "utils": `${path.resolve(__dirname, './src/utils')}`,
      "mainTheme": `${path.resolve(__dirname, './src/mainTheme.js')}`,
    }
  }
})
