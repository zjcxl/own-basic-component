/// <reference types="vitest" />

import { resolve } from 'node:path'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'
import ViteDts from 'vite-plugin-dts'
import ReactivityTransform from '@vue-macros/reactivity-transform/vite'

export default defineConfig({
  plugins: [
    Vue({
      script: {
        defineModel: true,
      },
    }),
    ReactivityTransform(),
    VueJsx(),
    ViteDts(),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        '@vueuse/core',
      ],
      dts: true,
      vueTemplate: true,
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  // https://github.com/vitest-dev/vitest
  test: {
    environment: 'jsdom',
  },
  build: {
    target: 'modules',
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs', 'umd'],
      name: 'BasicVue',
      // the proper extensions will be added
      fileName: 'index',
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
