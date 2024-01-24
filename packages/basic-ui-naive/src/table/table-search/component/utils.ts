import type { CustomSearchItem, SearchPropsType } from '../types'

/**
 * 组件处理器
 */
class ComponentHandler {
  /**
   * 缓存的map
   */
  map: Map<keyof SearchPropsType, (item: any, index: number) => CustomSearchItem> = new Map()

  /**
   * 添加注入数据
   * @param type
   * @param method
   */
  put<TYPE extends keyof SearchPropsType>(
    type: TYPE | TYPE[],
    method: (item: SearchPropsType[TYPE], index: number) => CustomSearchItem,
  ) {
    if (Array.isArray(type)) {
      type.forEach((item) => {
        this.map.set(item, method)
      })
      return
    }
    this.map.set(type, method)
  }

  /**
   * 获取
   * @param type
   */
  get<TYPE extends keyof SearchPropsType>(type: TYPE) {
    return this.map.get(type) as (item: SearchPropsType[TYPE], index: number) => CustomSearchItem
  }
}

/**
 * 组件处理器实例
 */
export const componentHandlerInstance = new ComponentHandler()
