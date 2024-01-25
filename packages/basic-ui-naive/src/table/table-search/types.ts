import type { CSSProperties, VNode } from 'vue'
import type {
  DatePickerSearchPropsType,
  DateRangePickerSearchPropsType,
  DateTimePickerSearchPropsType,
  DateTimeRangePickerSearchPropsType,
  InputSearchPropsType,
  SEARCH_TYPE_DATE_PICKER,
  SEARCH_TYPE_DATE_RANGE_PICKER,
  SEARCH_TYPE_DATE_TIME_PICKER,
  SEARCH_TYPE_DATE_TIME_RANGE_PICKER,
  SEARCH_TYPE_INPUT_PICKER,
  SEARCH_TYPE_SELECT,
  SEARCH_TYPE_TEXT_PICKER,
  SelectSearchPropsType,
  TextSearchPropsType,
} from './component'
import type { SEARCH_TYPE_SELECT_MULTIPLE, SelectMultiplePropsType } from './component/select-multiple'

/**
 * 类型信息
 */
export interface SearchPropsType {
  [SEARCH_TYPE_INPUT_PICKER]: InputSearchPropsType
  [SEARCH_TYPE_TEXT_PICKER]: TextSearchPropsType
  [SEARCH_TYPE_DATE_PICKER]: DatePickerSearchPropsType
  [SEARCH_TYPE_DATE_RANGE_PICKER]: DateRangePickerSearchPropsType
  [SEARCH_TYPE_DATE_TIME_PICKER]: DateTimePickerSearchPropsType
  [SEARCH_TYPE_DATE_TIME_RANGE_PICKER]: DateTimeRangePickerSearchPropsType
  [SEARCH_TYPE_SELECT]: SelectSearchPropsType
  [SEARCH_TYPE_SELECT_MULTIPLE]: SelectMultiplePropsType
}

/**
 * 将某个字段改为必填
 */
export type RequiredField<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>

/**
 * 将多个字段改为必填
 */
export type RequiredFields<T, K extends (keyof T)[]> = Omit<T, K[number]> & Required<Pick<T, K[number]>>

/**
 * 类型key信息
 */
export type DefaultSearchPropsKeyType = keyof SearchPropsType

/**
 * 类型value信息
 */
export type DefaultSearchPropsValueType = SearchPropsType[keyof SearchPropsType]

/**
 * 基础的类型信息
 */
export interface BaseSearchProps<TYPE extends DefaultSearchPropsKeyType, VALUE_TYPE = string, OPTIONS_TYPE = void> {
  /**
   * 类型
   */
  type: TYPE
  /**
   * 字段名称
   */
  field: string
  /**
   * 默认值
   */
  defaultValue?: VALUE_TYPE
  /**
   * 其他额外参数
   */
  extra?: OPTIONS_TYPE
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
  hidden?: boolean
  /**
   * 占位符
   * @default undefined
   */
  placeholder?: string
}

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
 * 时间state
 */
export interface BaseComponentStateProps<T1, T2 = void> {
  /**
   * 默认值
   */
  defaultValue?: T1
  /**
   * 索引
   */
  index: number
  /**
   * 占位符
   */
  placeholder?: string
  /**
   * 字段信息
   */
  field: string
  /**
   * 其他参数信息
   */
  extra?: T2
}

/**
 * 自定义搜索项的内容
 */
export interface CustomSearchItem {
  /**
   * 样式信息
   */
  style?: CSSProperties
  /**
   * 组件信息
   */
  component: VNode
}
