import type { RequestConfig } from '@own-basic-component/config'
import { NANOID } from '@own-basic-component/util'

export const requestConfig: RequestConfig = {
  header: () => ({
    // 如果请求参数中有需要submit-key的参数，设置缓存
    'submit-key': ({ data }) => data['submit-key'] ? NANOID(16) : '',
    // token
    'authToken': () => NANOID(36).toLowerCase(),
    // 客户端类型
    'client': () => 'apifox',
  }),
}
