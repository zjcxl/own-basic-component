'use strict'

import type { BaseBuriedModel } from '../../type'

/**
 * st事件
 */
export interface SimpleBuriedStModel {
  /**
   * 停留时间
   */
  stayTime: number
}

export interface BuriedStModel extends SimpleBuriedStModel, BaseBuriedModel {

}
