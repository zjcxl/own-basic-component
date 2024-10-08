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
  install: (app: App) => void
}

/**
 * 高德地图信息
 */
export interface AMapOptionType {
  /**
   * 接口地址
   */
  api: string
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
  url?: Partial<Record<EventType, string[]>>
  /**
   * 发送页面停留数据的最小时间
   */
  d?: number
  /**
   * 其他信息（全局信息，层级最低）
   */
  extra?: Record<string, string>
  /**
   * 高德地图参数信息
   */
  amap?: AMapOptionType
}
