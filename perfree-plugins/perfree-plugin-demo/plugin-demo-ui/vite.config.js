import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),

    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    })
  ],
  server: {
    port: 4201,
    host: '0.0.0.0',
    cors: true
  },
  build: {
    chunkSizeWarningLimit: 1024, // chunk 大小警告的限制（单位kb）
    outDir: '../src/main/resources/ui',
    emptyOutDir: true
  },
  base: './'
})
