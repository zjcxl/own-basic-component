'use strict'

import { getUrl } from '../../data'
import type { SimpleExtraInfoStType } from '../../type'
import { resolveToUrlSearchParams, send as resultSend } from '../../util'
import { clear, getExtraInfo } from './push'

/**
 * page view 页面浏览
 * params 事件参数
 */
export function send(data?: Partial<SimpleExtraInfoStType>) {
  const params = resolveToUrlSearchParams<SimpleExtraInfoStType>('st', {
    ...getExtraInfo(),
    ...data || {},
  })
  // 执行发送请求
  resultSend(getUrl('st'), params.toString())
  clear()
}
