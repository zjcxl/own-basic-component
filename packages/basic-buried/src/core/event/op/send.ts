import { getUrl, OP } from '../../data'
import { resolveToUrlSearchParams, send as resultSend } from '../../util'
import { clear, getExtraInfo } from './push'
import type { SimpleExtraInfoOpType } from '../../type'

/**
 * 操作事件
 * params 事件参数
 */
export function send(data?: Partial<SimpleExtraInfoOpType>) {
  const params = resolveToUrlSearchParams<SimpleExtraInfoOpType>(OP, {
    ...getExtraInfo(),
    ...data,
  })
  // 执行发送请求
  resultSend(getUrl(OP), params.toString())
  clear()
}
