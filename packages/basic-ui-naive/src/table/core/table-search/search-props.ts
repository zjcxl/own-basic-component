'use strict'

import type { CSSProperties, VNode } from 'vue'
import type { SelectMixedOption } from 'naive-ui/es/select/src/interface'
import type { QueryDataType } from '../../common'

export const SEARCH_PROP_TYPE_TEXT = 'text'
export const SEARCH_PROP_TYPE_SELECT = 'select'
export const SEARCH_PROP_TYPE_DATE_PICKER = 'date-picker'
export const SEARCH_PROP_TYPE_DATE_RANGE_PICKER = 'date-range-picker'
export const SEARCH_PROP_TYPE_DATE_TIME_PICKER = 'date-time-picker'
export const SEARCH_PROP_TYPE_DATE_TIME_RANGE_PICKER = 'date-time-range-picker'
export const SEARCH_PROP_TYPE_TIME_PICKER = 'time-picker'
export const SEARCH_PROP_TYPE_SORT = 'sort'
export const SEARCH_PROP_TYPE_NUMBER = 'number'
export const SEARCH_PROP_TYPE_AUTO_COMPLETE = 'auto-complete'

/**
 * 类型信息
 */
export type SearchPropType =
  typeof SEARCH_PROP_TYPE_TEXT
  | typeof SEARCH_PROP_TYPE_SELECT
  | typeof SEARCH_PROP_TYPE_DATE_PICKER
  | typeof SEARCH_PROP_TYPE_DATE_RANGE_PICKER
  | typeof SEARCH_PROP_TYPE_DATE_TIME_PICKER
  | typeof SEARCH_PROP_TYPE_DATE_TIME_RANGE_PICKER
  | typeof SEARCH_PROP_TYPE_TIME_PICKER
  | typeof SEARCH_PROP_TYPE_SORT
  | typeof SEARCH_PROP_TYPE_NUMBER
  | typeof SEARCH_PROP_TYPE_AUTO_COMPLETE

/**
 * 查询条件接口
 */
export interface SearchOptionProps {
  key?: string | number
  value: string | number | boolean
  label: string
}

/**
 * 基础的类型信息
 */
export interface BaseSearchProps<VALUE_TYPE = QueryDataType > {
  /**
   * 自定义宽度，不确定可以不填写，目前最小宽度15rem
   * @default undefined
   */
  width?: number
  /**
   * 标题字段
   * @default undefined
   */
  label?: string
  /**
   * 是否隐藏
   * @default false
   */
  hidden?: boolean | ((params: QueryDataType) => boolean)
  /**
   * 字段名称
   */
  field: string
  /**
   * 占位符
   * @default undefined
   */
  placeholder?: string
  /**
   * 默认值
   * @default undefined
   */
  defaultValue?: VALUE_TYPE
  /**
   * 格式化提交的内容
   * @param value
   * @default undefined
   */
  formatValue?: (value: VALUE_TYPE) => QueryDataType
}

export type textSearchPropsType = (BaseSearchProps & {
  type: typeof SEARCH_PROP_TYPE_TEXT
})

export type selectSearchPropsType = (BaseSearchProps & {
  type: typeof SEARCH_PROP_TYPE_SELECT
  options: SelectMixedOption[]
})

export type datePickerSearchPropsType = (BaseSearchProps & {
  type: typeof SEARCH_PROP_TYPE_DATE_PICKER
  options: DatePicker
})

export type dateRangePickerSearchPropsType = (BaseSearchProps & {
  type: typeof SEARCH_PROP_TYPE_DATE_RANGE_PICKER
  options: DateRangePicker
})

export type dateTimePickerSearchPropsType = (BaseSearchProps & {
  type: typeof SEARCH_PROP_TYPE_DATE_TIME_PICKER
  options: DatePicker
})

export type dateTimeRangePickerSearchPropsType = (BaseSearchProps & {
  type: typeof SEARCH_PROP_TYPE_DATE_TIME_RANGE_PICKER
  options: DateTimeRangePicker
})

export type timePickerSearchPropsType = (BaseSearchProps & {
  type: typeof SEARCH_PROP_TYPE_TIME_PICKER
  options: DatePicker
})

export type sortPickerSearchPropsType = (BaseSearchProps & {
  type: typeof SEARCH_PROP_TYPE_SORT
})

export type numberPickerSearchPropsType = (BaseSearchProps & {
  type: typeof SEARCH_PROP_TYPE_NUMBER
})

export type autoCompletePickerSearchPropsType = (BaseSearchProps & {
  type: typeof SEARCH_PROP_TYPE_AUTO_COMPLETE
})

/**
 * 搜索参数类型
 */
export type SearchProps = textSearchPropsType
  | selectSearchPropsType
  | datePickerSearchPropsType
  | dateRangePickerSearchPropsType
  | dateTimePickerSearchPropsType
  | dateTimeRangePickerSearchPropsType
  | timePickerSearchPropsType
  | sortPickerSearchPropsType
  | numberPickerSearchPropsType
  | autoCompletePickerSearchPropsType

/**
 * 搜索的额外参数
 */
export interface SearchExtra {
  /**
   * 搜索按钮的文本
   */
  searchButtonText?: string
}

/**
 * 查询参数的值对象
 */
export interface SearchValueData {
  data: Record<string, any>
}

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
 * 日期范围选择器的类型
 */
export type DateRangeFieldFormatType = [
  (field: string) => string,
  (field: string) => string,
]

/**
 * 日期选择器的参数
 */
export interface DateRangePicker extends DatePicker {
  fieldFormat?: DateRangeFieldFormatType
}

/**
 * 日期范围选择器的类型
 */
export type DateTimeRangeFieldFormatType = [
  (field: string) => string,
  (field: string) => string,
]

/**
 * 日期选择器的参数
 */
export interface DateTimeRangePicker extends DatePicker {
  fieldFormat?: DateTimeRangeFieldFormatType
}

export interface CustomSearchItem {
  style?: CSSProperties
  component: VNode
}
