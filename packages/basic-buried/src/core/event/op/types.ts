'use strict'

import type { BaseBuriedModel } from '../../type'

/**
 * op事件
 */
export interface SimpleBuriedOpModel {
  /**
   * 操作名称
   */
  actionName: string
}

export interface BuriedOpModel extends SimpleBuriedOpModel, BaseBuriedModel {

}
