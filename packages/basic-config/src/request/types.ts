import { getProjectConfig } from '../project'
import type { MaskConfig } from '../mask/types'
import type { RequestMethod } from '../project/types'

/**
 * 默认的参数类型
 */
export type QueryObjectType = Record<string, any>
/**
 * 默认的参数类型
 */
export type QueryType = QueryObjectType | any

/**
 * 合并的方式类型
 */
export type MergeType = 'replace' | 'merge'

/**
 * 自定义响应字段
 */
interface CustomFieldType<T = ResultModel> {
  code: keyof T
  message: keyof T
  data: keyof T
}

/**
 * 请求额外信息
 */
export interface RequestExtra {
  method: Method
  api: string
  data: QueryType
}

/**
 * 请求的状态
 */
export type RequestStatus = 'success' | 'error' | 'timeout' | 'abort'

/**
 * 请求配置类型
 */
export interface RequestConfig<T = any, RESPONSE_TYPE = ResultModel<T>> {
  /**
   * 待处理的自定义响应字段
   */
  field?: CustomFieldType<RESPONSE_TYPE>
  /**
   * 继承的信息
   */
  extends?: Array<RequestConfig<T, RESPONSE_TYPE>>
  /**
   * 请求的参数类型
   */
  paramType?: 'form' | 'text'
  /**
   * 合并的方式
   * replace 替换
   * merge 合并
   */
  mergeType?: MergeType
  /**
   * 请求前缀（此处设置不会调用全局配置）
   */
  baseUrl?: string
  /**
   * 请求格式
   */
  contentType?: 'application/x-www-form-urlencoded' | 'application/json;charset=UTF-8'
  /**
   * 超时时间
   */
  timeout?: number
  /**
   * 请求成功的code
   */
  success?: Array<CodeType>
  /**
   * 请求遮罩层配置
   */
  mask?: MaskConfig | false
  /**
   * 请求头对象
   */
  header?: () => Record<string, (extra: RequestExtra) => string>
  /**
   * 仅success的状态下的处理
   * @param status 状态
   * @param extra 额外数据
   * @param data 响应数据
   */
  after?: () => Array<(status: RequestStatus, extra: RequestExtra, data: RESPONSE_TYPE) => void>
  /**
   * 请求结束后执行的操作
   * @param data 响应业务数据
   */
  successFinally?: (data: RESPONSE_TYPE) => void
  /**
   * 异常处理
   */
  exceptionHandleMap?: <R extends BaseRequestModel<T, RESPONSE_TYPE>>() => Record<CodeType, (res: RESPONSE_TYPE, model: R) => Promise<RESPONSE_TYPE | void>>
  /**
   * 上传进度
   * @param progressEvent
   */
  onUploadProgress?: (progressEvent: ProgressEvent) => void
}

export type Method =
  | 'get' | 'GET'
  | 'delete' | 'DELETE'
  | 'head' | 'HEAD'
  | 'options' | 'OPTIONS'
  | 'post' | 'POST'
  | 'put' | 'PUT'
  | 'patch' | 'PATCH'
  | 'purge' | 'PURGE'
  | 'link' | 'LINK'
  | 'unlink' | 'UNLINK'

/**
 * 请求对象
 */
export abstract class BaseRequestModel<T = any, RESPONSE_TYPE = ResultModel<T>> {
  // 请求方式
  protected method: Method = 'GET'
  // 请求的api
  protected api = ''
  // 请求的参数
  protected data?: QueryType = {}
  // 其他配置信息
  protected config: RequestConfig<T, RESPONSE_TYPE>
  // 请求方法
  protected requestMethod?: RequestMethod

  protected constructor(method: Method, api: string, data: QueryType, config: RequestConfig<T, RESPONSE_TYPE>) {
    this.api = api
    this.method = method
    this.data = data
    this.config = config
    this.requestMethod = getProjectConfig().requestMethod
  }

  /**
   * 请求方法
   * @param config 配置信息（可以直接更换为最终的请求配置）
   */
  abstract request(config?: RequestConfig<T, RESPONSE_TYPE>): Promise<RESPONSE_TYPE>

  /**
   * 追加参数
   * @param type 位置类型
   * @param key 键
   * @param value 值
   */
  public append(type: 'data' | 'url' | 'header', key: string, value: any): BaseRequestModel<T, RESPONSE_TYPE> {
    if (!key || !value)
      return this
    if (type === 'header') {
      this.config.header = () => ({
        ...this.config.header,
        [key]: () => value,
      })
    }
    else if (type === 'url' || this.method === 'get') {
      this.api = `${this.api + (~this.api.indexOf('?') ? '&' : '?')}${key}=${value}`
    }
    else {
      this.data[key] = value
    }
    return this
  }

  getMethod() {
    return this.method
  }

  getApi() {
    return this.api
  }

  getData() {
    return this.data
  }

  getConfig() {
    return this.config
  }
}

/**
 * 默认的api返回实体类
 */
export interface ResultModel<T = any> {
  code: string
  t: string
  message: string
  data: T
}

/**
 * 返回code类型
 */
export type CodeType = string | number

/**
 * api返回实体类对象
 */
export type ResultModelType<T = any, V = ResultModel<T>> = V

/**
 * 默认的返回实体类
 */
export type ResultVo = ResultModelType

/**
 * 分页数据
 */
export interface PageResultModel<T> {
  // 列表数据
  list: Array<T>
  // 页码
  page: number
  // 行数
  rows: number
  // 总行数
  total: number
  // 是否已经到最后
  isLastPage: boolean
}
