import type { BaseSearchProps } from '../../types'
import type { DatePicker } from '../date-picker'

/**
 * 日期时间选择器的参数
 */
export const SEARCH_TYPE_DATE_TIME_PICKER = 'date-time-picker'

/**
 * 日期时间选择器的参数
 */
export interface DateTimePicker extends DatePicker {

}

/**
 * 日期时间选择器的参数
 */
export type DateTimePickerSearchPropsType = BaseSearchProps<
  typeof SEARCH_TYPE_DATE_TIME_PICKER,
  number,
  DateTimePicker
>
