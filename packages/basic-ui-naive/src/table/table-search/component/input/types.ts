import type { BaseSearchProps } from '../../types'

/**
 * 文本类型
 */
export const SEARCH_TYPE_INPUT_PICKER = 'input'
export const SEARCH_TYPE_TEXT_PICKER = 'text'

/**
 * 日期时间选择器的参数
 */
export type InputSearchPropsType = BaseSearchProps<
  typeof SEARCH_TYPE_INPUT_PICKER
>

/**
 * 日期时间选择器的参数
 */
export type TextSearchPropsType = BaseSearchProps<
  typeof SEARCH_TYPE_TEXT_PICKER
>
