import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// element-plus自动导入插件
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [
        // 1. 配置element-plus采用scss样式配色系统
        ElementPlusResolver({ importStyle: 'sass' })
      ]
    })
  ],
  resolve: {
    base: './',
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 2. 自动导入定制化样式文件进行样式覆盖
        additionalData: `@use "@/styles/element/index.scss" as *;`
      }
    }
  }
})
