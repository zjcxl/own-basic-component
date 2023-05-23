'use strict'

import { getUrl } from '../../data'
import type { SimpleExtraInfoPvType } from '../../type'
import { resolveToUrlSearchParams, send as resultSend } from '../../util'
import { clear, getExtraInfo } from './push'

/**
 * page view 页面浏览
 * params 事件参数
 */
export function send(data?: Partial<SimpleExtraInfoPvType>) {
  const params = resolveToUrlSearchParams<SimpleExtraInfoPvType>('pv', {
    ...getExtraInfo(),
    ...data,
  })
  // 执行发送请求
  resultSend(getUrl('pv'), params.toString())
  clear()
}
