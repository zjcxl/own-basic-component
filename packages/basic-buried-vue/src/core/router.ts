'use strict'

import { sendPv, sendSt } from '@own-basic-component/buried'
import type { Router } from 'vue-router'

/**
 * 初始化路由数据
 * @param router
 * @param d 发送的间隔时间
 */
function setRouterBuried(router: Router, d = 2000) {
  // 记录开始时间
  let startTimestamp = Date.now()

  router.beforeEach((to, from, next) => {
    // 发送停留时间
    const stayTime = Date.now() - startTimestamp
    // 如果时间大于2s才会发送
    if (stayTime > d) {
      sendSt({
        // 来源地址
        fromPagePath: from.path || '',
        // 来源名称
        fromPageName: from.name?.toString() || '',
        // 目的地址
        toPagePath: to.path || '',
        // 目的名称
        toPageName: to.name?.toString() || '',
        // 停留时间
        d: `${d}`,
      })
    }
    next()
  })

  // 跳转页面的时候发送访问的pv
  router.afterEach(() => {
    sendPv()
    startTimestamp = Date.now()
  })
}

export {
  setRouterBuried,
}
