'use strict'

import type { LoadingBarConfig } from './types'

/**
 * 默认的加载条信息
 */
export const defaultLoadingConfig: LoadingBarConfig = {
  start: () => {
    console.log('start')
  },
  finish: () => {
    console.log('finish')
  },
  success: () => {
    console.log('success')
  },
  error: () => {
    console.log('error')
  },
}
