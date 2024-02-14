import { format } from 'date-fns'
import type { QueryDataType } from '../../../common'
import type {
  DateTimeRangeFieldFormatType,
  DateTimeRangePickerSearchPropsType,
} from './types'

/**
 * 默认的日期时间范围格式化
 */
export const DEFAULT_DATE_TIME_RANGE_FORMATTER: string = 'yyyy-MM-dd HH:mm:ss'

/**
 * 默认的字段格式化数组
 */
export const DEFAULT_DATE_TIME_RANGE_FIELD_FORMAT: DateTimeRangeFieldFormatType = [
  (field: string) => `${field}Start`,
  (field: string) => `${field}End`,
]

/**
 * 最终的格式化内容
 * @param format
 */
export const getFinalDateTimeRangePickerFormatter = (format?: string): string => format || DEFAULT_DATE_TIME_RANGE_FORMATTER

/**
 * 最终的字段格式化数组
 * @param format
 */
export const getFinalDateTimeRangePickerFieldFormatArray = (format?: DateTimeRangeFieldFormatType): DateTimeRangeFieldFormatType => format || DEFAULT_DATE_TIME_RANGE_FIELD_FORMAT

/**
 * 日期时间范围的值
 * @param item
 * @param value
 */
export function getDateTimeRangePickerDefaultParams(item: DateTimeRangePickerSearchPropsType, value?: [number, number]): QueryDataType {
  const formatter = getFinalDateTimeRangePickerFormatter()
  const fieldFormatArray = getFinalDateTimeRangePickerFieldFormatArray()
  return getDateTimeRangePickerParams(formatter, fieldFormatArray, item.field, value || item.defaultValue)
}

/**
 * 日期时间范围的值
 * @param formatter
 * @param fieldFormatArray
 * @param field
 * @param value
 */
export function getDateTimeRangePickerParams(
  formatter: string,
  fieldFormatArray: DateTimeRangeFieldFormatType,
  field: string,
  value?: [number, number],
): QueryDataType {
  const result = {} as QueryDataType
  fieldFormatArray.forEach((method, index) => {
    result[method(field)] = value?.[index] ? format(new Date(value[index]), formatter) : undefined
  })
  return result
}
