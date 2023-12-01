import { resolve } from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    includeSource: ['./**/*.ts'],
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, '.')
    },
  },
})