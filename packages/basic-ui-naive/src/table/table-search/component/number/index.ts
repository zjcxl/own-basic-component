import { h } from 'vue'
import { encasementSearchItem } from '../../utils'
import { componentHandlerInstance } from '../utils'
import OwnNumber from './OwnNumber.vue'
import { SEARCH_TYPE_NUMBER } from './types'
import type { NumberPropsType } from './types'

export * from './types'

componentHandlerInstance.put(SEARCH_TYPE_NUMBER, (item: NumberPropsType, index) => {
  return encasementSearchItem(item, h(OwnNumber, {
    defaultValue: item.defaultValue,
    index,
    disabled: item.disabled,
    placeholder: item.placeholder,
    field: item.field,
    extra: item.extra,
  }))
})

export {
  OwnNumber,
}
