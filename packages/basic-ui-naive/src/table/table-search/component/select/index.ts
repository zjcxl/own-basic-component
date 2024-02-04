import { h } from 'vue'
import { encasementSearchItem } from '../../utils'
import { componentHandlerInstance } from '../utils'
import OwnSearchSelect from './OwnSearchSelect.vue'
import type { SelectSearchPropsType } from './types'
import { SEARCH_TYPE_SELECT } from './types'

export * from './types'

componentHandlerInstance.put(SEARCH_TYPE_SELECT, (item: SelectSearchPropsType, index) => {
  return encasementSearchItem(item, h(OwnSearchSelect, {
    defaultValue: item.defaultValue,
    index,
    disabled: item.disabled,
    placeholder: item.placeholder,
    field: item.field,
    extra: item.extra,
  }))
})

export {
  OwnSearchSelect,
}
