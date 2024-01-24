import { h } from 'vue'
import { encasementSearchItem, putComponentHandler } from '../../utils'
import OwnDatePicker from './OwnDatePicker.vue'
import type { DatePickerSearchPropsType } from './types'
import { SEARCH_TYPE_DATE_PICKER } from './types'

export * from './types'

putComponentHandler(SEARCH_TYPE_DATE_PICKER, (item: DatePickerSearchPropsType, index) => {
  return encasementSearchItem(item, h(OwnDatePicker, {
    defaultValue: item.defaultValue,
    index,
    placeholder: item.placeholder,
    field: item.field,
    options: item.options,
  }))
})

export {
  OwnDatePicker,
}
