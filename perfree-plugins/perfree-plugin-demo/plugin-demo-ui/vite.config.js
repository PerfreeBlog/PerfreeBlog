import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/

const isDev = process.env.NODE_ENV === 'development';
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
    chunkSizeWarningLimit: 1024,
    // 输出到插件resources/ui目录
    outDir: '../src/main/resources/ui',
    emptyOutDir: true,
  },
  // 设置基础url, 如果是开发环境,则使用plugin/插件ID方式,生产环境则为/plugin-static/插件ID方式
  base: isDev ? '/plugin/perfree-demo/' : '/plugin-static/perfree-demo/',
})
