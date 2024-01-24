import { h } from 'vue'
import { encasementSearchItem, putComponentHandler } from '../../utils'
import OwnInput from './OwnInput.vue'
import type { InputSearchPropsType } from './types'
import { SEARCH_TYPE_INPUT_PICKER } from './types'

export * from './types'

putComponentHandler(SEARCH_TYPE_INPUT_PICKER, (item: InputSearchPropsType, index) => {
  return encasementSearchItem(item, h(OwnInput, {
    defaultValue: item.defaultValue,
    index,
    placeholder: item.placeholder,
    field: item.field,
    options: item.options,
  }))
})

export {
  OwnInput,
}
