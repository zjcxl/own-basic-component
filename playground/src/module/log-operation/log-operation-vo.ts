import type { BaseCreateVo } from '~/base/base-vo'

/**
 * 操作日志持久化
 * @author 陈学礼
 * @date 2023-09-22 10:43:25
 * @version 1
 */
export interface LogOperationVo extends BaseCreateVo {
  // 操作编码
  code: string
  // 响应信息
  message: string
  // 用户id
  fkUserId: number
  // 用户名
  userName: string
  // 状态 1=成功 2=失败
  status: number
  // 方法名（全限定名）
  methodName: string
  // 客户端
  client: string
  // ip
  ip: string
  // 额外信息
  extra: string
  // 模块名称
  moduleName: string
  // 操作名称
  operationName: string
  // 请求时间
  requestTime: string
  // 请求参数
  requestParams: string
  // 响应时间
  responseTime: string
  // 响应参数
  responseParams: string
}
