import type { BaseSearchProps } from '../../types'

/**
 * 日期选择器的参数
 */
export const SEARCH_TYPE_DATE_PICKER = 'date-picker'

/**
 * 日期选择器的参数
 */
export interface DatePicker {
  /**
   * 格式化字符串
   */
  format?: string
}

/**
 * 日期选择器的参数
 */
export type DatePickerSearchPropsType = BaseSearchProps<
  typeof SEARCH_TYPE_DATE_PICKER,
  number,
  DatePicker
>
