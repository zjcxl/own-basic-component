import type { SelectMixedOption } from 'naive-ui/es/select/src/interface'
import type { RequiredField } from '@own-basic-component/config'
import type { BaseSearchProps } from '../../types'

/**
 * 日期时间选择器的参数
 */
export const SEARCH_TYPE_SELECT = 'select'

export interface SelectAdvancedOption {
  /**
   * 主要选项
   */
  options: SelectMixedOption[]
  /**
   * 是否显示tag
   */
  tag?: boolean
  /**
   * 是否可过滤
   */
  filterable?: boolean
  /**
   * 是否允许多选
   */
  multiple?: boolean
  /**
   * 是否允许动态添加
   */
  allowDynamicAdd?: boolean
}

/**
 * 日期时间选择器的参数
 */
export type SelectSearchPropsType = RequiredField<
  BaseSearchProps<
    typeof SEARCH_TYPE_SELECT,
    string | number,
    SelectAdvancedOption
  >,
  'extra'
>
