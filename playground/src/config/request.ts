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
    'authToken': () => 'd94a998b-83e9-4f40-bb80-8b04437c8713',
    // 客户端类型
    'client': () => 'apifox',
  }),
}
