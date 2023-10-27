'use strict'

import type { SelectMixedOption } from 'naive-ui/es/select/src/interface'
import type { QueryDataType } from './types'

export const SEARCH_PROP_TYPE_TEXT = 'text'
export const SEARCH_PROP_TYPE_SELECT = 'select'
export const SEARCH_PROP_TYPE_DATE_PICKER = 'date-picker'
export const SEARCH_PROP_TYPE_TIME_PICKER = 'time-picker'
export const SEARCH_PROP_TYPE_SORT = 'sort'
export const SEARCH_PROP_TYPE_NUMBER = 'number'
export const SEARCH_PROP_TYPE_AUTO_COMPLETE = 'auto-complete'

/**
 * 类型信息
 */
type SearchPropType =
  typeof SEARCH_PROP_TYPE_TEXT
  | typeof SEARCH_PROP_TYPE_SELECT
  | typeof SEARCH_PROP_TYPE_DATE_PICKER
  | typeof SEARCH_PROP_TYPE_TIME_PICKER
  | typeof SEARCH_PROP_TYPE_SORT
  | typeof SEARCH_PROP_TYPE_NUMBER
  | typeof SEARCH_PROP_TYPE_AUTO_COMPLETE

/**
 * 查询条件接口
 */
export interface SearchOptionProps {
  key: string | number
  value: string | number | boolean
  text: string
}

export interface SearchProps<TYPE = any> {
  /**
   * 类型
   * @default text
   */
  type: SearchPropType
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
  defaultValue?: TYPE
  /**
   * 格式化提交的内容
   * @param value
   * @default undefined
   */
  formatValue?: (value: TYPE) => QueryDataType
  /**
   * 部分类型的额外选项
   */
  options?: Array<SelectMixedOption>
}

/**
 * 搜索的额外参数
 */
export interface SearchExtra {
  /**
   * 搜索的文本
   */
  searchButtonText?: string
}

/**
 * 查询参数的值对象
 */
export interface SearchValueData {
  data: Record<string, any>
}
