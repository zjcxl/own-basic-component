import type { BaseSearchProps } from '../../types'

/**
 * 选择器的参数
 */
export const SEARCH_TYPE_NUMBER = 'number'

export interface NumberAdvancedExtra {
  /**
   * 步长
   */
  step?: number
  /**
   * 最大值
   */
  max?: number
  /**
   * 最小值
   */
  min?: number
}

/**
 * 选择器的参数
 */
export type NumberPropsType = BaseSearchProps<
  typeof SEARCH_TYPE_NUMBER,
  number,
  NumberAdvancedExtra
>
