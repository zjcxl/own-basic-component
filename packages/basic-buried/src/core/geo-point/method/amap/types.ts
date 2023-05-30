'use strict'

/**
 * 高德定位信息模型
 */
export interface AMapModel {
  /**
   * 状态
   */
  status: string
  /**
   * 编码
   */
  infoCode: string
  /**
   * 省份
   */
  province: string
  /**
   * 城市
   */
  city: string
  /**
   * 邮编
   */
  adCode: string
  /**
   * 经纬度信息
   */
  geoPoint: [string, string]
}
