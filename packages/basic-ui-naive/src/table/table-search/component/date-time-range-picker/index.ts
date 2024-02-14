import { h } from 'vue'
import { encasementSearchItem } from '../../utils'
import { componentHandlerInstance } from '../utils'
import OwnDateTimeRangePicker from './OwnDateTimeRangePicker.vue'
import type { DateTimeRangePickerSearchPropsType } from './types'
import { SEARCH_TYPE_DATE_TIME_RANGE_PICKER } from './types'

export * from './types'
export * from './utils'

componentHandlerInstance.put(
  SEARCH_TYPE_DATE_TIME_RANGE_PICKER,
  (item: DateTimeRangePickerSearchPropsType, index) => {
    return encasementSearchItem(item, h(OwnDateTimeRangePicker, {
      defaultValue: item.defaultValue,
      index,
      disabled: item.disabled,
      placeholder: item.placeholder,
      field: item.field,
      extra: item.extra,
    }))
  },
)

export {
  OwnDateTimeRangePicker,
}
