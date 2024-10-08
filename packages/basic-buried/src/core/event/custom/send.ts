import { CUSTOM, getUrl } from '../../data'
import { resolveToUrlSearchParams, send as resultSend } from '../../util'
import { clear, getExtraInfo } from './push'
import type { SimpleExtraInfoCustomType } from '../../type'

/**
 * 自定义
 * params 事件参数
 */
export function send(data?: Partial<SimpleExtraInfoCustomType>) {
  const params = resolveToUrlSearchParams<SimpleExtraInfoCustomType>(CUSTOM, {
    ...getExtraInfo(),
    ...data,
  })
  // 执行发送请求
  resultSend(getUrl(CUSTOM), params.toString())
  clear()
}
