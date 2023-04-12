'use strict'

import type { BaseRequestModel, ResultModel } from '@own-basic-component/config'
import { useMessage } from '@own-basic-component/util'
import type { RequestModel } from '../core'
import type { ResultModelConfirm } from '../types'

/**
 * 二次确认的方法
 * @param res 响应信息
 * @param model 请求对象
 */
export function confirmMethod(res: ResultModel, model: BaseRequestModel<any, ResultModel>) {
  return new Promise<ResultModel>((resolve) => {
    const vo = res as ResultModelConfirm
    useMessage().confirm(vo.message, () => {
      const { key, token } = vo.data
      // 再次发出请求信息
      const tempModel = model as RequestModel
      tempModel.append('url', key, token).request().then((data) => {
        resolve(data)
      })
    })
  })
}
