import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // Esto hace que cuando el código use 'process.env', lea 'window.process.env'
    // permitiendo que tu script en index.html funcione en el build final.
    process: 'window.process'
  },
  build: {
    outDir: 'dist',
  }
});