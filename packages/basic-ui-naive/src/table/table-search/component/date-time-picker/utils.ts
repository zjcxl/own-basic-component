import { format } from 'date-fns'
import type {
  QueryDataType,
} from '../../../common'
import type { DateTimePickerSearchPropsType } from './types'

/**
 * 默认的日期时间格式化
 */
export const DEFAULT_DATE_TIME_FORMATTER: string = 'yyyy-MM-dd HH:mm:ss'

/**
 * 最终的格式化内容
 * @param format
 */
export const getFinalDateTimePickerFormatter = (format?: string): string => format || DEFAULT_DATE_TIME_FORMATTER

/**
 * 日期时间的值
 * @param item
 * @param value
 */
export function getDateTimePickerDefaultParams(item: DateTimePickerSearchPropsType, value?: number): QueryDataType {
  const formatter = getFinalDateTimePickerFormatter()
  return getDateTimePickerParams(formatter, item.field, value || item.defaultValue)
}

/**
 * 日期时间的值
 * @param formatter
 * @param field
 * @param value
 */
export function getDateTimePickerParams(
  formatter: string,
  field: string,
  value?: number,
): QueryDataType {
  return {
    [field]: value ? format(new Date(value), formatter) : undefined,
  }
}
