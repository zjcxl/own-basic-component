import { getUrl, ST } from '../../data'
import { resolveToUrlSearchParams, send as resultSend } from '../../util'
import { clear, getExtraInfo } from './push'
import type { SimpleExtraInfoStType } from '../../type'

/**
 * stay time 页面停留
 * params 事件参数
 */
export function send(data?: Partial<SimpleExtraInfoStType>) {
  const params = resolveToUrlSearchParams<SimpleExtraInfoStType>(ST, {
    ...getExtraInfo(),
    ...data || {},
  })
  // 执行发送请求
  resultSend(getUrl(ST), params.toString())
  clear()
}
