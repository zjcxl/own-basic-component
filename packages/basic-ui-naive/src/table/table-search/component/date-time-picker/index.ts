import { h } from 'vue'
import { encasementSearchItem, putComponentHandler } from '../../utils'
import OwnDateTimePicker from './OwnDateTimePicker.vue'
import type { DateTimePickerSearchPropsType } from './types'
import { SEARCH_TYPE_DATE_TIME_PICKER } from './types'

export * from './types'

putComponentHandler(SEARCH_TYPE_DATE_TIME_PICKER, (item: DateTimePickerSearchPropsType, index) => {
  return encasementSearchItem(item, h(OwnDateTimePicker, {
    defaultValue: item.defaultValue,
    index,
    placeholder: item.placeholder,
    field: item.field,
    options: item.options,
  }))
})

export {
  OwnDateTimePicker,
}
