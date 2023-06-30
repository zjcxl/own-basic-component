/// <reference types="vitest" />

import { resolve } from 'node:path'
import Vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import ViteDts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    Vue({
      reactivityTransform: true,
    }),
    ViteDts(),
  ],
  build: {
    target: 'modules',
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs', 'umd'],
      name: 'BasicBuriedVue',
      // the proper extensions will be added
      fileName: 'index',
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue', '@own-basic-component/buried'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
