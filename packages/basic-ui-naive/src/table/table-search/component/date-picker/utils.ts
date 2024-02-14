import { format } from 'date-fns'
import type {
  QueryDataType,
} from '../../../common'
import type { DatePickerSearchPropsType } from './types'

/**
 * 默认的日期时间格式化
 */
export const DEFAULT_DATE_FORMATTER: string = 'yyyy-MM-dd'

/**
 * 最终的格式化内容
 * @param format
 */
export const getFinalDatePickerFormatter = (format?: string): string => format || DEFAULT_DATE_FORMATTER

/**
 * 日期时间的值
 * @param item
 * @param value
 */
export function getDatePickerDefaultParams(item: DatePickerSearchPropsType, value?: number): QueryDataType {
  const formatter = getFinalDatePickerFormatter()
  return getDatePickerParams(formatter, item.field, value || item.defaultValue)
}

/**
 * 日期时间的值
 * @param formatter
 * @param field
 * @param value
 */
export function getDatePickerParams(
  formatter: string,
  field: string,
  value?: number,
): QueryDataType {
  return {
    [field]: value ? format(new Date(value), formatter) : undefined,
  }
}
