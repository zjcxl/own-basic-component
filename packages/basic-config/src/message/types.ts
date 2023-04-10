'use strict'

/**
 * 消息基础配置
 */
export interface MessageUtilBaseConfig<ContentType = string> {
  /**
   * 默认的消息内容
   */
  content?: ContentType
  /**
   * 延时关闭时间
   */
  duration?: number
}

/**
 * 消息方法配置
 */
export interface MessageUtilMethod<ContentType = string, ReturnType = void> {

  /**
   * 消息提示
   * @param content
   * @param duration
   * @param onClose
   */
  info(content: ContentType, duration?: number, onClose?: () => void): ReturnType

  /**
   * 错误消息提示
   * @param content
   * @param duration
   * @param onClose
   */
  error(content: ContentType, duration?: number, onClose?: () => void): ReturnType

  /**
   * 警告消息提示
   * @param content
   * @param duration
   * @param onClose
   */
  warning(content: ContentType, duration?: number, onClose?: () => void): ReturnType

  /**
   * 成功消息提示
   * @param content
   * @param duration
   * @param onClose
   */
  success(content: ContentType, duration?: number, onClose?: () => void): ReturnType

  /**
   * 加载框
   * @param content
   * @param duration
   * @param onClose
   */
  loading(content: ContentType, duration?: number, onClose?: () => void): ReturnType

  /**
   * 弹框
   * @param title
   * @param ok
   * @param cancel
   */
  confirm(title: string | (() => string), ok?: () => void, cancel?: () => void): void
}

/**
 * 消息工具配置
 */
export interface MessageUtilConfig<ContentType = string, ReturnType = void> extends MessageUtilBaseConfig<ContentType> {
  /**
   * 通用方法配置
   */
  method?: MessageUtilMethod<ContentType, ReturnType>
}
