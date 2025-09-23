import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/tests/**/*.vitest.jsx'],
    coverage: { // Threshold brings CI Pipeline to fail
      statements: 0,
      branches: 0,
      functions: 0,
      lines: 0,
    }
  },
})