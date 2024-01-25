import { h } from 'vue'
import { encasementSearchItem } from '../../utils'
import { componentHandlerInstance } from '../utils'
import OwnDateRangePicker from './OwnDateRangePicker.vue'
import type { DateRangePickerSearchPropsType } from './types'
import { SEARCH_TYPE_DATE_RANGE_PICKER } from './types'

export * from './types'

componentHandlerInstance.put(
  SEARCH_TYPE_DATE_RANGE_PICKER,
  (item: DateRangePickerSearchPropsType, index) => {
    return encasementSearchItem(item, h(OwnDateRangePicker, {
      defaultValue: item.defaultValue,
      index,
      placeholder: item.placeholder,
      field: item.field,
      extra: item.extra,
    }))
  },
)

export {
  OwnDateRangePicker,
}
