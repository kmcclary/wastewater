import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  define: {
    'process.env': process.env
  },
  base: command === 'serve' ? '/' : '/wastewater/',
  plugins: [react()],
  resolve: {
    alias: {
      '@tailwindConfig': path.resolve(__dirname, 'tailwind.config.js'),
    },
  },
  optimizeDeps: {
    include: [
      '@tailwindConfig',
    ]
  },
  build: {
    outDir: 'dist', // Ensure this is set to your desired output directory
    commonjsOptions: {
      transformMixedEsModules: true,
    }
  }
}))