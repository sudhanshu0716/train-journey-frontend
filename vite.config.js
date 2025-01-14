import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
    build: {
    outDir: 'dist', // Set the output directory to 'build'
    chunkSizeWarningLimit: 5000, // Adjust chunk size limit if necessary (default is 500)
  },
})
