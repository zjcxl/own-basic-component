import type { AuthInfoModelType } from './types'

/**
 * 基础的认证信息
 */
let AUTH_INFO: AuthInfoModelType = {
  userId: '',
  userName: '',
}

/**
 * 设置认证信息
 * @param data
 */
export function setAuthInfo(data: AuthInfoModelType) {
  AUTH_INFO = {
    ...AUTH_INFO,
    ...data,
  }
}

/**
 * 获取认证信息
 */
export function getAuthInfo(): AuthInfoModelType {
  return {
    ...AUTH_INFO,
  }
}

/**
 * 清除认证信息
 */
export function clearAuthInfo() {
  AUTH_INFO = {
    userId: '',
    userName: '',
  }
}

/**
 * 是否认证
 */
export function isAuth() {
  return !!AUTH_INFO.userId
}
