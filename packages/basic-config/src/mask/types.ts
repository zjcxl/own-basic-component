export interface MaskConfig {
  /**
   * 遮罩层的编号
   */
  key?: string
  /**
   * 显示文字
   */
  content?: string
  /**
   * 超时时间
   */
  timeout?: number
}

/**
 * 遮罩层工具的使用方法
 */
export interface MaskUtilMethodConfig {
  /**
   * 打开遮罩层
   * @param config
   */
  open: (config: MaskConfig) => void
  /**
   * 关闭遮罩层
   * @param key
   * @param num
   */
  close: (key: string, num?: number) => void
}

/**
 * 遮罩层的处理方法
 */
export interface MaskUtilConfig<T = HTMLElement> {
  /**
   * 打开遮罩层的处理方法
   * @param config
   * @param put
   */
  open: (config: MaskConfig, put: (item: T) => void) => void
  /**
   * 关闭遮罩层
   * @param item
   */
  close: (item: T) => void
}
