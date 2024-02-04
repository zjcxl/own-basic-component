import { h } from 'vue'
import { encasementSearchItem } from '../../utils'
import { componentHandlerInstance } from '../utils'
import OwnDateTimePicker from './OwnDateTimePicker.vue'
import type { DateTimePickerSearchPropsType } from './types'
import { SEARCH_TYPE_DATE_TIME_PICKER } from './types'

export * from './types'

componentHandlerInstance.put(SEARCH_TYPE_DATE_TIME_PICKER, (item: DateTimePickerSearchPropsType, index) => {
  return encasementSearchItem(item, h(OwnDateTimePicker, {
    defaultValue: item.defaultValue,
    index,
    disabled: item.disabled,
    placeholder: item.placeholder,
    field: item.field,
    extra: item.extra,
  }))
})

export {
  OwnDateTimePicker,
}
