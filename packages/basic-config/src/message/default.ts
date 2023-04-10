'use strict'

import type { MessageUtilConfig } from './types'

/**
 * 默认的配置
 */
export const defaultMessageConfig: Required<MessageUtilConfig<any, any>> = {
  content: '',
  /**
   * 全局持续时间
   */
  duration: 200,
  method: {
    /**
     * 成功的信息
     * @param content 内容
     * @param duration 持续时间
     * @param onClose 关闭的回调
     */
    success(content: string, duration?: number, onClose?: () => void): void {
      console.log(content, duration, onClose)
    },
    /**
     * 成功的信息
     * @param content 内容
     * @param duration 持续时间
     * @param onClose 关闭的回调
     */
    info(content: string, duration?: number, onClose?: () => void): void {
      console.log(content, duration, onClose)
    },
    /**
     * 警告的信息
     * @param content 内容
     * @param duration 持续时间
     * @param onClose 关闭的回调
     */
    warning(content: string, duration?: number, onClose?: () => void): void {
      console.log(content, duration, onClose)
    },
    /**
     * 错误的信息
     * @param content 内容
     * @param duration 持续时间
     * @param onClose 关闭的回调
     */
    error(content: string, duration?: number, onClose?: () => void): void {
      console.log(content, duration, onClose)
    },
    /**
     * 加载的信息
     * @param content 内容
     * @param duration 持续时间
     * @param onClose 关闭的回调
     */
    loading(content: string, duration?: number, onClose?: () => void): void {
      console.log(content, duration, onClose)
    },
    /**
     * 弹框的信息
     * @param content 内容
     * @param duration 持续时间
     * @param onClose 关闭的回调
     */
    confirm(title: string | (() => string), ok?: () => void, cancel?: () => void): void {
      console.log(title, ok, cancel)
    },
  },
}
