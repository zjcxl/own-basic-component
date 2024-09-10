import { useLoadingBar } from '@own-basic-component/config'
import { useMask, useMessage } from '@own-basic-component/util'
import type {
  BaseRequestModel,
  CodeType,
  RequestConfig,
  RequestMethod,
  ResultModel,
  TempResponseType,
} from '@own-basic-component/config'

/**
 * 请求方法信息
 * @param requestModel 请求的对象
 * @param requestData 请求的参数
 * @param config 请求的配置
 */
export const fetchRequestMethod: RequestMethod = <T = any, RESPONSE_TYPE = ResultModel<T>, CONFIG = RequestInit>(
  requestModel: BaseRequestModel<T, RESPONSE_TYPE>,
  requestData: CONFIG,
  config: RequestConfig<T, RESPONSE_TYPE>,
): Promise<TempResponseType<T, RESPONSE_TYPE>> => {
  const loadingBar = useLoadingBar()
  loadingBar.start()
  // 请求
  const mask = useMask()
  return new Promise((resolve) => {
    // 打开遮罩层
    if (config?.mask)
      mask.open(config.mask)
    const result = fetch(requestModel.getApi(), requestData as RequestInit)
      .then(res => res.json())
      .then((data) => {
        // 判断结果是否在正确的集合内
        const response: RESPONSE_TYPE = data.data as RESPONSE_TYPE
        const code = response[config.field!.code] as any as CodeType
        if (~config.success!.indexOf(code)) {
          // 显示成功进度条
          loadingBar.success()
          // 执行预处理并返回
          return Promise.resolve(response)
        }
        else {
          // 异常捕获处理
          const exceptionHandleMap = config.exceptionHandleMap?.()
          if (exceptionHandleMap?.[code]) {
            // 显示成功进度条
            loadingBar.success()
            return exceptionHandleMap[code](response, requestModel)
          }
          else {
            // 执行异常提示
            useMessage().error(response[config.field!.message] as any as string)
            // 显示错误进度条
            loadingBar.error()
          }
          return Promise.resolve()
        }
      })
      .catch()
      .finally(() => {
        // 关闭加载bar
        loadingBar.finish()
        // 关闭遮罩层
        if (config?.mask)
          mask.close(config.mask?.key || '')
      })
    result.then((response) => {
      if (response) {
        resolve({
          type: 'success',
          response: response!,
        })
      }
      else {
        resolve({ type: 'error' })
      }
    })
  })
}
