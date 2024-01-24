import { h } from 'vue'
import { encasementSearchItem } from '../../utils'
import { componentHandlerInstance } from '../utils'
import OwnDatePicker from './OwnDatePicker.vue'
import type { DatePickerSearchPropsType } from './types'
import { SEARCH_TYPE_DATE_PICKER } from './types'

export * from './types'

componentHandlerInstance.put(
  SEARCH_TYPE_DATE_PICKER,
  (item: DatePickerSearchPropsType, index) => {
    return encasementSearchItem(item, h(OwnDatePicker, {
      defaultValue: item.defaultValue,
      index,
      placeholder: item.placeholder,
      field: item.field,
      options: item.options,
    }))
  },
)

export {
  OwnDatePicker,
}
