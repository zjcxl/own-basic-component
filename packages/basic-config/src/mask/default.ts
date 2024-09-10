import type { MaskConfig, MaskUtilConfig } from './types'

/**
 * 默认的遮罩工具配置
 */
export const defaultMaskConfig: MaskUtilConfig = {
  /**
   * 打开遮罩层方法
   * @param config 配置信息
   * @param put 放置遮罩层的方法
   */
  open(config: MaskConfig, put: (item: any) => void): void {
    // eslint-disable-next-line no-console
    console.log('open', config, put)
  },
  /**
   * 关闭遮罩层方法
   * @param item 关闭的遮罩层信息
   */
  close(item: any): void {
    // eslint-disable-next-line no-console
    console.log('close', item)
  },
}
