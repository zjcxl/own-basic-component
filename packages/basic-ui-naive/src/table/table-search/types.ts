import type { CSSProperties, VNode } from 'vue'
import type { QueryDataType } from '../common'
import type {
  SEARCH_TYPE_DATE_PICKER,
  SEARCH_TYPE_DATE_RANGE_PICKER,
  SEARCH_TYPE_DATE_TIME_PICKER,
  SEARCH_TYPE_DATE_TIME_RANGE_PICKER,
  SEARCH_TYPE_INPUT_PICKER,
  SEARCH_TYPE_SELECT,
} from './component'

/**
 * 类型信息
 */
export type SearchPropType =
  typeof SEARCH_TYPE_INPUT_PICKER
  | typeof SEARCH_TYPE_DATE_PICKER
  | typeof SEARCH_TYPE_SELECT
  | typeof SEARCH_TYPE_DATE_PICKER
  | typeof SEARCH_TYPE_DATE_RANGE_PICKER
  | typeof SEARCH_TYPE_DATE_TIME_PICKER
  | typeof SEARCH_TYPE_DATE_TIME_RANGE_PICKER

/**
 * 基础的类型信息
 */
export interface BaseSearchProps<TYPE extends SearchPropType, VALUE_TYPE = string, OPTIONS_TYPE = void> {
  /**
   * 类型
   */
  type: TYPE
  /**
   * 默认值
   */
  defaultValue?: VALUE_TYPE
  /**
   * 其他参数
   */
  options: OPTIONS_TYPE
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
}

/**
 * 默认的搜索参数
 */
export type DefaultSearchPropsType = BaseSearchProps<any, any, any>

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
  options?: T2
}

/**
 * 自定义搜索项的内容
 */
export interface CustomSearchItem {
  style?: CSSProperties
  component: VNode
}
