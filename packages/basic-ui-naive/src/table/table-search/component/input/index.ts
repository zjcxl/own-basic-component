import { h } from 'vue'
import { encasementSearchItem } from '../../utils'
import { componentHandlerInstance } from '../utils'
import OwnInput from './OwnInput.vue'
import type { InputSearchPropsType, TextSearchPropsType } from './types'
import { SEARCH_TYPE_INPUT_PICKER, SEARCH_TYPE_TEXT_PICKER } from './types'

export * from './types'

componentHandlerInstance.put(
  SEARCH_TYPE_INPUT_PICKER,
  (item: InputSearchPropsType, index) => {
    return encasementSearchItem(item, h(OwnInput, {
      defaultValue: item.defaultValue,
      index,
      disabled: item.disabled,
      placeholder: item.placeholder,
      field: item.field,
      extra: item.extra,
    }))
  },
)

componentHandlerInstance.put(
  SEARCH_TYPE_TEXT_PICKER,
  (item: TextSearchPropsType, index) => {
    return encasementSearchItem(item, h(OwnInput, {
      defaultValue: item.defaultValue,
      index,
      placeholder: item.placeholder,
      field: item.field,
      extra: item.extra,
    }))
  },
)

export {
  OwnInput,
}
