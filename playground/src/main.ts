import { defineProjectConfig } from '@own-basic-component/config'
import { axiosRequestMethod } from '@own-basic-component/request-axios'
import { createSSRApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router/auto'
import App from './App.vue'
import { loadingBarConfig, messageConfig } from '~/config/message'
import { requestConfig } from '~/config/request'

import './styles/reset.css'
import './styles/main.css'
import 'uno.css'

const app = createSSRApp(App)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
})

// 设置请求信息
defineProjectConfig({
  baseUrl: '/api',
  // 请求工具
  requestMethod: axiosRequestMethod,
  // 请求工具配置
  request: requestConfig,
  // 消息工具配置
  message: messageConfig,
  // 加载条配置
  loading: loadingBarConfig,
})

app.directive('buried', {})
app.use(router)
app.mount('#app')
