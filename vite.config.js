import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/wastewater/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@tailwindConfig': path.resolve(__dirname, './tailwind.config.js')
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  },
  server: {
    port: 5173,
    strictPort: true,
  }
});