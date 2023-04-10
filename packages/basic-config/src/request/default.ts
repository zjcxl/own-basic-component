'use strict'

import type { RequestConfig } from './types'

/**
 * 请求成功的代码
 */
const SUCCESS_CODE_ARRAY = ['00000', '0', 0]

/**
 * 默认的请求配置信息
 */
export const defaultConfig: RequestConfig = {
  field: {
    code: 'code',
    message: 'message',
    data: 'data',
  },
  paramType: 'text',
  baseUrl: '',
  mergeType: 'replace',
  contentType: 'application/json;charset=UTF-8',
  timeout: 10000,
  preprocess: data => data,
  success: [...SUCCESS_CODE_ARRAY],
  mask: false,
  header: () => ({}),
}
