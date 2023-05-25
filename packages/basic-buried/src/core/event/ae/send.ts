'use strict'

import { AE, getUrl } from '../../data'
import type { SimpleExtraInfoAeType } from '../../type'
import { resolveToUrlSearchParams, send as resultSend } from '../../util'
import { clear, getExtraInfo } from './push'

/**
 * page view 页面浏览
 * params 事件参数
 */
export function send(data?: Partial<SimpleExtraInfoAeType>) {
  const params = resolveToUrlSearchParams<SimpleExtraInfoAeType>(AE, {
    ...getExtraInfo(),
    ...data,
  })
  // 执行发送请求
  resultSend(getUrl(AE), params.toString())
  clear()
}
