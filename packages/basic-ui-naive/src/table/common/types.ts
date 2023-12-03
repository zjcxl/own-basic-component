'use strict'

import type { PageResultModel } from '@own-basic-component/config'

/**
 * 列表数据类型
 */
export type RowDataType = Record<string, any>

/**
 * 查询参数类型
 */
export type QueryDataType = Record<string, any>

/**
 * 请求之前的类型钩子
 */
export type BeforeFetchMethodType = () => Promise<QueryDataType>

/**
 * 默认的请求参数
 */
export type DefaultParamsType = QueryDataType

/**
 * 分页参数
 */
export interface PageInfo {
  page: number
  rows: number
  total: number
}

/**
 * 请求方法的类型
 */
export type FetchMethodType<T = RowDataType> = (params?: QueryDataType) => Promise<PageResultModel<T>>

/**
 * 表格的默认实例对象
 */
export interface TableInstanceType<T = any> {
  refresh(pageInit?: number | boolean): void
  getDataList(): T[]
}
/**
 * 表格的默认slots对象
 */
export interface TableSlotsType<T = any> {
  default(): void
  search(): void
  operation(): void
  data(params: { list: T[] }): void
}
