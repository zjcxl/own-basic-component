import { initUrl, setAMapApi, setAppKey, setGlobalInfo } from '@own-basic-component/buried'
import type { App } from 'vue'
import buriedDirective from './directive-buried'
import { setRouterBuried } from './router'
import type { Buried, BuriedOptions } from './types'

/**
 * 创建埋点对象信息
 * @param options
 */
function createBuried(options: BuriedOptions): Buried {
  return {
    install(app: App) {
      // 设置appKey
      setAppKey(options.appKey)
      // 设置全局信息
      setGlobalInfo(options.extra)
      // 设置路由的信息
      if (options.router)
        setRouterBuried(options.router, options.d)
      // 设置地址信息
      if (options.url)
        initUrl(options.url)
      // 页面埋点信息事件
      app.use(buriedDirective)
      // 是否使用高德地图api
      if (options.amap?.api)
        setAMapApi(options.amap.api)
    },
  }
}

export {
  createBuried,
}
