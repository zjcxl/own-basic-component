import { defineProjectConfig } from '@own-basic-component/config'
import { createSSRApp } from 'vue'
import { axiosRequestMethod } from '@own-basic-component/request-axios'
import App from './App.vue'
import { router } from '~/router'

import './styles/reset.css'
import './styles/main.css'
import 'uno.css'
import { loadingBarConfig, messageConfig } from '~/config/message'
import { requestConfig } from '~/config/request'

const app = createSSRApp(App)

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

app.use(router)
app.mount('#app')
