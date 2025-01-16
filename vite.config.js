import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
    build: {
    chunkSizeWarningLimit: 5000, // Adjust chunk size limit if necessary (default is 500)
  },
})
