'use strict'

import type { QueryType } from '@own-basic-component/config'

/**
 * 处理带文件的请求参数
 * @param data
 * @param requestData
 */
export function handleFormDataParams(data: QueryType, requestData: any) {
  if (typeof data !== 'object') {
    requestData.data = data
    return
  }
  // 需要使用form-data格式
  const formData = new FormData()
  Object.entries(data).map(([key, value]) => {
    if (typeof value === 'number') {
      return {
        key,
        value: value.toString(),
      }
    }
    else if (value instanceof Blob) {
      return {
        key,
        value: value as File,
      }
    }
    else if (typeof value === 'object') {
      return {
        key,
        value: value?.toString(),
      }
    }
    else if (typeof value === 'boolean') {
      return {
        key,
        value: value.toString(),
      }
    }
    return {
      key,
      value: String(value),
    }
  })
    // 需要过滤掉所有未空的字符串的值
    .filter(({ value }) => value !== null && value !== undefined)
    .forEach(({
      key,
      value,
    }) => {
      if (typeof value === 'undefined')
        return

      formData.append(key, value)
    })
  requestData.data = formData
}
