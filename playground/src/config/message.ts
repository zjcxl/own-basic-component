import type { LoadingBarConfig, MessageUtilConfig } from '@own-basic-component/config'
import { createDiscreteApi } from 'naive-ui'

const {
  message: messageUtil,
  dialog: dialogUtil,
  loadingBar: loadingBarUtil,
} = createDiscreteApi(['message', 'dialog', 'loadingBar'])

/**
 * 信息配置
 */
export const messageConfig: MessageUtilConfig<string, void> = {
  method: {
    success(content: string, duration?: number, onClose?: () => void): void {
      messageUtil.success(content, {
        duration,
        onClose,
      })
    },
    info(content: string, duration?: number, onClose?: () => void): void {
      messageUtil.info(content, {
        duration,
        onClose,
      })
    },
    warning(content: string, duration?: number, onClose?: () => void): void {
      messageUtil.warning(content, {
        duration,
        onClose,
      })
    },
    error(content: string, duration?: number, onClose?: () => void): void {
      messageUtil.error(content, {
        duration,
        onClose,
      })
    },
    loading(content: string, duration?: number, onClose?: () => void): void {
      messageUtil.loading(content, {
        duration,
        onClose,
      })
    },
    confirm(title: string | (() => string), ok?: () => void, cancel?: () => void): void {
      dialogUtil.warning({
        onPositiveClick: ok,
        onNegativeClick: cancel,
        positiveText: '确定',
        negativeText: '取消',
        content: title,
        title: '确认信息',
      })
    },
  },
}

/**
 * 加载条配置
 */
export const loadingBarConfig: LoadingBarConfig = {
  /**
   * 加载开始
   */
  start(): void {
    loadingBarUtil.start()
  },
  /**
   * 加载结束
   */
  finish(): void {
    loadingBarUtil.finish()
  },
  /**
   * 加载成功
   */
  success(): void {
    loadingBarUtil.finish()
  },
  /**
   * 加载失败
   */
  error(): void {
    loadingBarUtil.error()
  },
}
