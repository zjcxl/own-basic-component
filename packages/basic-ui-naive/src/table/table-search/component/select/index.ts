import { h } from 'vue'
import { encasementSearchItem, putComponentHandler } from '../../utils'
import OwnSearchSelect from './OwnSearchSelect.vue'
import type { SelectSearchPropsType } from './types'
import { SEARCH_TYPE_SELECT } from './types'

export * from './types'

putComponentHandler(SEARCH_TYPE_SELECT, (item: SelectSearchPropsType, index) => {
  return encasementSearchItem(item, h(OwnSearchSelect, {
    defaultValue: item.defaultValue,
    index,
    placeholder: item.placeholder,
    field: item.field,
    options: item.options,
  }))
})

export {
  OwnSearchSelect,
}
