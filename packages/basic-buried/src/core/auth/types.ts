'use strict'

/**
 * 认证信息
 */
export interface AuthInfoModel {
  /**
   * 用户id
   */
  userId: string

  /**
   * 用户名称
   */
  userName: string
}

export type AuthInfoModelType = Required<AuthInfoModel> & Record<string, string>
