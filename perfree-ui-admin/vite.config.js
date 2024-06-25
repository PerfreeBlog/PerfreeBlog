import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag === 'my-element'
        }
      }
    }),
    vueJsx(),
    AutoImport({
      imports: ['vue', 'vue-router'],
      dts: false,
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dts: false,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 4200,
    open: false,
    proxy: {
      "/api": {
        target: 'http://127.0.0.1:8080/api',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      },
      "/attach": {
        target: 'http://127.0.0.1:8080/attach',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/attach/, '')
      },
    }
  },
  build: {
    chunkSizeWarningLimit: 1024, // chunk 大小警告的限制（单位kb）
    outDir: '../perfree-system-web/src/main/resources/static/admin',
    emptyOutDir: true
  },
  base: './'
})
