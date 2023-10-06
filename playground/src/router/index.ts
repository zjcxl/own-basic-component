import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

// 设置主路由信息
const routes: RouteRecordRaw[] = [
  {
    path: '/table',
    name: 'table',
    component: () => import('~/pages/table/index.vue'),
  },
  {
    path: '/log-operation',
    name: 'log-operation',
    component: () => import('~/pages/log-operation/index.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export { router }
