import { h } from 'vue'
import { encasementSearchItem, putComponentHandler } from '../../utils'
import OwnDateTimeRangePicker from './OwnDateTimeRangePicker.vue'
import type { DateTimeRangePickerSearchPropsType } from './types'
import { SEARCH_TYPE_DATE_TIME_RANGE_PICKER } from './types'

export * from './types'

putComponentHandler(SEARCH_TYPE_DATE_TIME_RANGE_PICKER, (item: DateTimeRangePickerSearchPropsType, index) => {
  return encasementSearchItem(item, h(OwnDateTimeRangePicker, {
    defaultValue: item.defaultValue,
    index,
    placeholder: item.placeholder,
    field: item.field,
    options: item.options,
  }))
})

export {
  OwnDateTimeRangePicker,
}
