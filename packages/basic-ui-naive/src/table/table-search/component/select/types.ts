import type { SelectMixedOption } from 'naive-ui/es/select/src/interface'
import type { BaseSearchProps } from '../../types'

/**
 * 日期时间选择器的参数
 */
export const SEARCH_TYPE_SELECT = 'select'

/**
 * 日期时间选择器的参数
 */
export type SelectSearchPropsType = BaseSearchProps<
  typeof SEARCH_TYPE_SELECT,
  string | number,
  SelectMixedOption[]
>
