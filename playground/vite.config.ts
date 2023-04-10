import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import VueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueJsx(),
  ],
})
