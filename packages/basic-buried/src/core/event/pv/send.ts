import { getUrl, PV } from '../../data'
import { resolveToUrlSearchParams, send as resultSend } from '../../util'
import { clear, getExtraInfo } from './push'
import type { SimpleExtraInfoPvType } from '../../type'

/**
 * page view 页面浏览
 * params 事件参数
 */
export function send(data?: Partial<SimpleExtraInfoPvType>) {
  const params = resolveToUrlSearchParams<SimpleExtraInfoPvType>(PV, {
    ...getExtraInfo(),
    ...data,
  })
  // 执行发送请求
  resultSend(getUrl(PV), params.toString())
  clear()
}
