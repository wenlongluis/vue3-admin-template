import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";


// https://vitejs.dev/config/
export default defineConfig({
  server: {
    // host: '0.0.0.0'
  },
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue'],
      resolvers: [
        // 自动导入ElementPlus
        ElementPlusResolver(),
      ],
    }),
    Components({
      resolvers: [
        // 自动注册图标组件
        IconsResolver({
          prefix: 'Icon',
          enabledCollections: ['ep'],
        }),
        // 自动注册ElementPlus组件
        ElementPlusResolver(),
      ],
    }),
    Icons({
      autoInstall: true,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
