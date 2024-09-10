import type { BaseBuriedModel } from '../../type'

/**
 * st事件
 */
export interface SimpleBuriedStModel {
  /**
   * 停留时间
   */
  stayTime: number
  /**
   * 来源地址
   */
  fromPagePath: string
  /**
   * 来源名称
   */
  fromPageName: string
  /**
   * 目的地址
   */
  toPagePath: string
  /**
   * 目的名称
   */
  toPageName: string
}

export interface BuriedStModel extends SimpleBuriedStModel, BaseBuriedModel {

}
