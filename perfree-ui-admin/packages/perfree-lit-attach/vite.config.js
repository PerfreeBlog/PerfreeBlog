import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    target: 'modules',
    outDir: 'dist',
    rollupOptions: {
      output: {
        chunkFileNames: 'js/[name].js',
        entryFileNames: 'js/[name].js',
      }
    }
  }
})

