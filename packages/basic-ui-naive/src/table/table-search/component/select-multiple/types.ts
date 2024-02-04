import type { RequiredField } from '@own-basic-component/config'
import type { SelectAdvancedOption } from '../select'
import type { BaseSearchProps } from '../../types'

export const SEARCH_TYPE_SELECT_MULTIPLE = 'select-multiple'

export type SelectMultiplePropsType = RequiredField<
  BaseSearchProps<
  typeof SEARCH_TYPE_SELECT_MULTIPLE,
  Array<string | number>,
  SelectAdvancedOption
  >,
  'extra'
>
