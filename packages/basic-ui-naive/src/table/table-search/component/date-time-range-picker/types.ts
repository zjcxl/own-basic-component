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
 * 日期时间范围快捷键的类型
 */
export type DateTimeRangeShortcutsValueType = [number, number]
export type DateTimeRangeShortcutsType = Record<string, DateTimeRangeShortcutsValueType>

export interface DateTimeRangeShortcutsSettingType {
  /**
   * 第二位的显示回拨
   */
  second?: number
}

/**
 * 日期时间选择器的参数
 */
export interface DateTimeRangePicker extends DatePicker {
  /**
   * 字段格式化
   */
  fieldFormat?: DateTimeRangeFieldFormatType
  /**
   * 快捷操作
   */
  shortcuts?: DateTimeRangeShortcutsType
  /**
   * 二级快捷操作
   */
  shortcutsSetting?: DateTimeRangeShortcutsSettingType
}

/**
 * 日期时间选择器的参数
 */
export type DateTimeRangePickerSearchPropsType = BaseSearchProps<
  typeof SEARCH_TYPE_DATE_TIME_RANGE_PICKER,
  [number, number],
  DateTimeRangePicker
>
