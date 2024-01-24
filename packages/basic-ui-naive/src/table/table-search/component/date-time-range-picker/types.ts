import type { BaseSearchProps } from '../../types'
import type { DatePicker } from '../date-picker'

/**
 * 日期时间选择器的参数
 */
export const SEARCH_TYPE_DATE_TIME_RANGE_PICKER = 'date-time-range-picker'

/**
 * 日期时间范围选择器的类型
 */
export type DateTimeRangeFieldFormatType = [
  (field: string) => string,
  (field: string) => string,
]

/**
 * 日期时间选择器的参数
 */
export interface DateTimeRangePicker extends DatePicker {
  /**
   * 字段格式化
   */
  fieldFormat?: DateTimeRangeFieldFormatType
}

/**
 * 日期时间选择器的参数
 */
export type DateTimeRangePickerSearchPropsType = BaseSearchProps<
  typeof SEARCH_TYPE_DATE_TIME_RANGE_PICKER,
  [number, number],
  DateTimeRangePicker
>
