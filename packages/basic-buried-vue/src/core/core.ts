import { initUrl, setAppKey } from '@own-basic-component/buried'
import { setRouterBuried } from '@own-basic-component/buried-vue'
import type { App } from 'vue'
import type { Buried, BuriedOptions } from './types'

import buriedDirective from './directive-buried'

/**
 * 创建埋点对象信息
 * @param options
 */
function createBuried(options: BuriedOptions): Buried {
  return {
    install(app: App) {
      // 设置appKey
      setAppKey(options.appKey)
      // 设置路由的信息
      if (options.router)
        setRouterBuried(options.router, options.d)
      // 设置地址信息
      if (options.url)
        initUrl(options.url)
      // 页面埋点信息事件
      app.use(buriedDirective)
    },
  }
}

export {
  createBuried,
}
