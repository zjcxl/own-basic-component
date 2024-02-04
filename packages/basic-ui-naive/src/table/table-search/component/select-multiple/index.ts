import { h } from 'vue'
import { encasementSearchItem } from '../../utils'
import { componentHandlerInstance } from '../utils'
import OwnSelectMultiple from './OwnSelectMultiple.vue'
import type { SelectMultiplePropsType } from './types'
import { SEARCH_TYPE_SELECT_MULTIPLE } from './types'

export * from './types'

componentHandlerInstance.put(SEARCH_TYPE_SELECT_MULTIPLE, (item: SelectMultiplePropsType, index) => {
  return encasementSearchItem(item, h(OwnSelectMultiple, {
    defaultValue: item.defaultValue,
    index,
    disabled: item.disabled,
    placeholder: item.placeholder,
    field: item.field,
    extra: item.extra,
  }))
})

export {
  OwnSelectMultiple,
}
