import type { AuthInfoModel } from '../auth'
import type { BowserInfo } from '../data'

/**
 * 认证信息
 */
export interface AppInfoModel {
  /**
   * 应用key
   */
  appKey: string
}

/**
 * 基础信息
 */
export interface BaseInfoModel extends BowserInfo {
  /**
   * origin
   */
  origin: string

  /**
   * pathname
   */
  pathname: string

  /**
   * 页面标题
   */
  pageTitle: string

  /**
   * 语言
   */
  language: string

  /**
   * 时区
   */
  timeZone: string

  /**
   * 时区偏移
   */
  timeZoneOffset: string

  /**
   * 页面宽度
   */
  width: number

  /**
   * 页面高度
   */
  height: number

  /**
   * 设备信息
   */
  devicePixelRatio: string

  /**
   * 浏览器信息
   */
  userAgent: string

  /**
   * 网络信息
   */
  online: string

  /**
   * 屏幕信息
   */
  screen: string
}

/**
 * 埋点信息基础对象
 */
export interface BaseBuriedModel extends AppInfoModel, AuthInfoModel, BaseInfoModel {

}
