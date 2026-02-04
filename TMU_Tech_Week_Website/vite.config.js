import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/Tmu_Tech_Week_Website/',
  plugins: [react()],
})
