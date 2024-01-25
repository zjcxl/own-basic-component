import type { SelectAdvancedOption } from '../select'
import type { BaseSearchProps, RequiredField } from '../../types'

export const SEARCH_TYPE_SELECT_MULTIPLE = 'select-multiple'

export type SelectMultiplePropsType = RequiredField<
  BaseSearchProps<
  typeof SEARCH_TYPE_SELECT_MULTIPLE,
  Array<string | number>,
  SelectAdvancedOption
  >,
  'extra'
>
