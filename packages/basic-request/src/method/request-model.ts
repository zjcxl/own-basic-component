import type { QueryType, RequestConfig, ResultModel } from '@own-basic-component/config'
import { RequestModel } from '../core'
import {
  METHOD_TYPE_DELETE,
  METHOD_TYPE_GET,
  METHOD_TYPE_POST,
  METHOD_TYPE_PUT,
} from '../types'

/**
 * get请求
 */
class GetRequestModel<T = any, RESPONSE_TYPE = ResultModel<T>> extends RequestModel<T, RESPONSE_TYPE> {
  constructor(api: string, data?: QueryType, config?: RequestConfig<T, RESPONSE_TYPE>) {
    super(METHOD_TYPE_GET, api, data, config)
  }
}

/**
 * post请求
 */
class PostRequestModel<T = any, RESPONSE_TYPE = ResultModel<T>> extends RequestModel<T, RESPONSE_TYPE> {
  constructor(api: string, data?: QueryType, config?: RequestConfig<T, RESPONSE_TYPE>) {
    super(METHOD_TYPE_POST, api, data, config)
  }
}

/**
 * put请求
 */
class PutRequestModel<T = any, RESPONSE_TYPE = ResultModel<T>> extends RequestModel<T, RESPONSE_TYPE> {
  constructor(api: string, data?: QueryType, config?: RequestConfig<T, RESPONSE_TYPE>) {
    super(METHOD_TYPE_PUT, api, data, config)
  }
}

/**
 * delete请求
 */
class DeleteRequestModel<T = any, RESPONSE_TYPE = ResultModel<T>> extends RequestModel<T, RESPONSE_TYPE> {
  constructor(api: string, data?: QueryType, config?: RequestConfig<T, RESPONSE_TYPE>) {
    super(METHOD_TYPE_DELETE, api, data, config)
  }
}

export {
  DeleteRequestModel,
  GetRequestModel,
  PostRequestModel,
  PutRequestModel,
}
