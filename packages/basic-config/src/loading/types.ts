/**
 * 加载条配置
 */
export interface LoadingBarConfig {
  /**
   * 加载开始
   */
  start: () => void
  /**
   * 加载完成
   */
  finish: () => void
  /**
   * 加载成功
   */
  success: () => void
  /**
   * 加载失败
   */
  error: () => void
}
