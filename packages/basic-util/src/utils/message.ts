'use strict'

import { getMessageConfig } from '@own-basic-component/config'
import type { MessageUtilMethod } from '@own-basic-component/config'

/**
 * 获取message的使用方法
 */
export function useMessage(): MessageUtilMethod {
  return getMessageConfig().method
}
