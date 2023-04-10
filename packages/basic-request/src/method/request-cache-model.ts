'use strict'

import type { BaseRequestModel, QueryType, RequestConfig, ResultModel } from '@own-basic-component/config'
import { RequestModel } from '../core'
import type { Method, MiddleRequestResult } from '../types'
import { METHOD_TYPE_DELETE, METHOD_TYPE_GET, METHOD_TYPE_POST, METHOD_TYPE_PUT } from '../types'

/**
 * 缓存对象
 */
const CACHE_MAP: Record<string, string> = {}

/**
 * 默认缓存的请求对象
 * @type T 数据返回的类型（不包括通用返回对象）
 * @type RESPONSE_TYPE 通用返回对象
 */
class RequestCacheModel<T = any, RESPONSE_TYPE = ResultModel<T>> extends RequestModel<T, RESPONSE_TYPE> {
  /**
   * 缓存key
   * @protected
   */
  protected cacheKey: string

  /**
   * 构造函数
   * @param method 请求方法
   * @param api 请求地址
   * @param data 请求数据
   * @param config 配置信息
   */
  constructor(method: Method, api: string, data?: QueryType, config?: RequestConfig<T, RESPONSE_TYPE>) {
    super(method, api, data, config)
    // 获取请求头信息（部分请求可能只是请求头中的参数不一样）
    const header = config?.header?.()
    // 设置缓存key
    this.cacheKey = this.method + this.api + JSON.stringify(this.data) + JSON.stringify(header)
  }

  /**
   * 请求之前处理的内容
   * @param model 请求对象
   * @param config 配置信息
   */
  before(model: BaseRequestModel<T, RESPONSE_TYPE>, config: RequestConfig<T, RESPONSE_TYPE>): MiddleRequestResult<T, RESPONSE_TYPE> {
    // 去缓存中获取信息
    const store = CACHE_MAP[this.cacheKey]
    // 数据返回
    return {
      type: store ? 'done' : 'continue',
      model,
      config,
      response: (store ? JSON.parse(store) : {}) as RESPONSE_TYPE,
    }
  }

  /**
   * 请求之后处理的内容
   * @param model 请求对象
   * @param config 配置信息
   * @param response 返回值
   */
  after(model: BaseRequestModel<T, RESPONSE_TYPE>, config: RequestConfig<T, RESPONSE_TYPE>, response: RESPONSE_TYPE): Omit<MiddleRequestResult<T, RESPONSE_TYPE>, 'type'> {
    if (config.field)
      CACHE_MAP[this.cacheKey] = JSON.stringify(response)
    return {
      model,
      config,
      response,
    }
  }
}

/**
 * 带缓存的get请求
 * @type T 数据返回的类型（不包括通用返回对象）
 * @type RESPONSE_TYPE 通用返回对象
 */
class GetRequestCacheModel<T = any, RESPONSE_TYPE = ResultModel<T>> extends RequestCacheModel<T, RESPONSE_TYPE> {
  /**
   * 构造函数
   * @param api 请求地址
   * @param data 请求数据
   * @param config 配置信息
   */
  constructor(api: string, data?: QueryType, config?: RequestConfig<T, RESPONSE_TYPE>) {
    super(METHOD_TYPE_GET, api, data, config)
  }
}

/**
 * 带缓存的post请求
 * @type T 数据返回的类型（不包括通用返回对象）
 * @type RESPONSE_TYPE 通用返回对象
 */
class PostRequestCacheModel<T = any, RESPONSE_TYPE = ResultModel<T>> extends RequestCacheModel<T, RESPONSE_TYPE> {
  /**
   * 构造函数
   * @param api 请求地址
   * @param data 请求数据
   * @param config 配置信息
   */
  constructor(api: string, data?: QueryType, config?: RequestConfig<T, RESPONSE_TYPE>) {
    super(METHOD_TYPE_POST, api, data, config)
  }
}

/**
 * 带缓存的put请求
 * @type T 数据返回的类型（不包括通用返回对象）
 * @type RESPONSE_TYPE 通用返回对象
 */
class PutRequestCacheModel<T = any, RESPONSE_TYPE = ResultModel<T>> extends RequestCacheModel<T, RESPONSE_TYPE> {
  /**
   * 构造函数
   * @param api 请求地址
   * @param data 请求数据
   * @param config 配置信息
   */
  constructor(api: string, data?: QueryType, config?: RequestConfig<T, RESPONSE_TYPE>) {
    super(METHOD_TYPE_PUT, api, data, config)
  }
}

/**
 * 带缓存的delete请求
 * @type T 数据返回的类型（不包括通用返回对象）
 * @type RESPONSE_TYPE 通用返回对象
 */
class DeleteRequestCacheModel<T = any, RESPONSE_TYPE = ResultModel<T>> extends RequestCacheModel<T, RESPONSE_TYPE> {
  /**
   * 构造函数
   * @param api 请求地址
   * @param data 请求数据
   * @param config 配置信息
   */
  constructor(api: string, data?: QueryType, config?: RequestConfig<T, RESPONSE_TYPE>) {
    super(METHOD_TYPE_DELETE, api, data, config)
  }
}

export {
  RequestCacheModel,
  GetRequestCacheModel,
  PostRequestCacheModel,
  PutRequestCacheModel,
  DeleteRequestCacheModel,
}
