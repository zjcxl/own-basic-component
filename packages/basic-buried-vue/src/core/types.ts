import type { EventType } from '@own-basic-component/buried'
import type { App } from 'vue'
import type { Router } from 'vue-router'

/**
 * 埋点信息对象
 */
export interface Buried {
  /**
   * 安装方法
   * @param app
   */
  install(app: App): void
}

/**
 * 参数
 */
export interface BuriedOptions {
  /**
   * app key
   */
  appKey: string
  /**
   * 路由信息
   */
  router?: Router
  /**
   * 推送地址
   */
  url?: Record<EventType, string[]>
  /**
   * 发送页面停留数据的最小时间
   */
  d: number
}
