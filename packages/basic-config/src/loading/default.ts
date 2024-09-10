import type { LoadingBarConfig } from './types'

/**
 * 默认的加载条信息
 */
export const defaultLoadingConfig: LoadingBarConfig = {
  start: () => {
    // eslint-disable-next-line no-console
    console.log('start')
  },
  finish: () => {
    // eslint-disable-next-line no-console
    console.log('finish')
  },
  success: () => {
    // eslint-disable-next-line no-console
    console.log('success')
  },
  error: () => {
    // eslint-disable-next-line no-console
    console.log('error')
  },
}
