import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import Components from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default defineConfig({
  // server: {
  //   host: '0.0.0.0'
  // },
  base: './',
  resolve: {
    alias: {
      '@': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    vue(),
    Components({
      dts: true,
    }),
  ],
})
