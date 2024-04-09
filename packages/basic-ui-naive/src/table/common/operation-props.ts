import type { CSSProperties } from 'vue'

/**
 * 表格的操作列对象接口
 */
export interface OperationProps<T> {
  /**
   * 操作名称
   */
  title: string
  /**
   * 是否隐藏，默认不隐藏
   */
  hidden?: boolean
  /**
   * 是否危险按钮
   */
  danger?: boolean
  /**
   * 上方分隔线
   */
  divider?: boolean
  /**
   * 上方分隔线
   */
  topDivider?: boolean
  /**
   * 下方分隔线
   */
  bottomDivider?: boolean
  /**
   * 路由地址
   */
  router?: string
  /**
   * 权限判断（以当前的路由信息进行判断）
   */
  permission?: boolean | string | (() => boolean)
  /**
   * 按钮样式
   */
  style?: CSSProperties

  /**
   * 渲染操作名称
   * @param record
   */
  titleRender?: (record: T) => string

  /**
   * 数据验证判断是否显示该-操作按钮，如果为true显示
   * @param record
   */
  check?: (record: T) => boolean

  /**
   * 点击后调用的方法
   * @param record 当前行的记录
   * @param el 当前行的元素
   */
  action: (record: T, el?: HTMLElement | null) => void
}

/**
 * 操作列额外参数
 */
export interface OperationExtra {
  /**
   * 宽度
   */
  width?: number
  /**
   * 固定位置
   */
  fixed?: 'left' | 'right' | ''
  /**
   * 最大的个数
   */
  max?: number
}
