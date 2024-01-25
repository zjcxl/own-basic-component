import type { SelectAdvancedOption } from '../select'
import type { BaseSearchProps } from '../../types'

export const SEARCH_TYPE_SELECT_MULTIPLE = 'select-multiple'

export type SelectMultiplePropsType = BaseSearchProps<
  typeof SEARCH_TYPE_SELECT_MULTIPLE,
  Array<string | number>,
  SelectAdvancedOption
>
