import type { RequestConfig } from '@own-basic-component/config'
import { NANOID } from '@own-basic-component/util'

export const requestConfig: RequestConfig = {
  header: () => ({
    // 表单防重
    'submit-key': ({ data }) => {
      // 如果请求参数中有需要submit-key的参数，设置缓存
      if (data['submit-key'])
        return NANOID(16)
      return ''
    },
    // token
    'authToken': () => '68edc169-6b9d-4e77-9e04-7ccefb513ab1',
    // 客户端类型
    'client': () => 'apifox',
  }),
}
