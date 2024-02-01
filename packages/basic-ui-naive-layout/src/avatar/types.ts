/**
 * 头像组件属性
 */
export interface AvatarComponentProps {
  /**
   * 用户名称
   */
  userName: string
  /**
   * 用户头像
   */
  avatar: string
}

/**
 * 头像上显示的菜单
 */
export interface AvatarComponentContextOptions {
  /**
   * 显示的菜单名称
   */
  label: string
  /**
   * 菜单的唯一标识
   */
  key: string | number
  /**
   * 点击之后执行的方法
   */
  action: () => void
}
