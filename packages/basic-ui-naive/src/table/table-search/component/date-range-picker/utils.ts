import { format } from 'date-fns'
import type { QueryDataType } from '../../../common'
import type {
  DateRangeFieldFormatType,
  DateRangePickerSearchPropsType,
} from './types'

/**
 * 默认的日期时间范围格式化
 */
export const DEFAULT_DATE_RANGE_FORMATTER: string = 'yyyy-MM-dd'

/**
 * 默认的字段格式化数组
 */
export const DEFAULT_DATE_RANGE_FIELD_FORMAT: DateRangeFieldFormatType = [
  (field: string) => `${field}Start`,
  (field: string) => `${field}End`,
]

/**
 * 最终的格式化内容
 * @param format
 */
export const getFinalDateRangePickerFormatter = (format?: string): string => format || DEFAULT_DATE_RANGE_FORMATTER

/**
 * 最终的字段格式化数组
 * @param format
 */
export const getFinalDateRangePickerFieldFormatArray = (format?: DateRangeFieldFormatType): DateRangeFieldFormatType => format || DEFAULT_DATE_RANGE_FIELD_FORMAT

/**
 * 日期时间范围的值
 * @param item
 * @param value
 */
export function getDateRangePickerDefaultParams(item: DateRangePickerSearchPropsType, value?: [number, number]): QueryDataType {
  const formatter = getFinalDateRangePickerFormatter()
  const fieldFormatArray = getFinalDateRangePickerFieldFormatArray()
  return getDateRangePickerParams(formatter, fieldFormatArray, item.field, value || item.defaultValue)
}

/**
 * 日期时间范围的值
 * @param formatter
 * @param fieldFormatArray
 * @param field
 * @param value
 */
export function getDateRangePickerParams(
  formatter: string,
  fieldFormatArray: DateRangeFieldFormatType,
  field: string,
  value?: [number, number],
): QueryDataType {
  const result = {} as QueryDataType
  fieldFormatArray.forEach((method, index) => {
    result[method(field)] = value?.[index] ? format(new Date(value[index]), formatter) : undefined
  })
  return result
}
