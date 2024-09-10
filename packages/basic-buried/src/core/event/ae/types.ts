import type { BaseBuriedModel } from '../../type'

/**
 * ae事件
 */
export interface SimpleBuriedAeModel {
  /**
   * 按钮名称
   */
  actionName: string

  /**
   * 操作事件
   */
  actionType: string
}

export interface BuriedAeModel extends SimpleBuriedAeModel, BaseBuriedModel {

}
