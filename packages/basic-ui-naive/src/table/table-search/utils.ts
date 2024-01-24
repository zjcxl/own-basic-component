import type { VNode } from 'vue'
import { componentHandlerInstance } from './component'
import type { CustomSearchItem, DefaultSearchPropsValueType } from './types'

/**
 * 计算分页的大小信息
 * @param normalRows 每页的大小
 * @param max 最大的大小
 */
export function calcPageSizes(normalRows: number, max = 300): Array<number> {
  // 验证数据
  const rows = Math.max(normalRows, 1)
  // 计算
  return [...new Set([
    Math.min(Math.ceil(rows / 2), max),
    Math.min(rows, max),
    Math.min(Math.ceil(rows * 1.5), max),
    Math.min(Math.ceil(rows * 2), max),
    Math.min(Math.ceil(rows * 3), max),
    Math.min(Math.ceil(rows * 5), max),
    Math.min(Math.ceil(rows * 10), max),
  ])]
    .filter(item => item > 0)
    .sort((a, b) => a - b)
}

/**
 * 计算查询项
 * @param array 查询项
 */
export function calcSearchItems(array: Array<DefaultSearchPropsValueType>): CustomSearchItem[] {
  return array
    .map((item, index) => {
      return componentHandlerInstance.get(item.type)?.(item, index)
    })
    .filter(item => !!item) as CustomSearchItem[]
}

/**
 * 包装查询内容
 * @param item 查询项
 * @param node 节点
 */
export function encasementSearchItem(item: DefaultSearchPropsValueType, node: VNode): CustomSearchItem {
  return {
    style: item.width && item.width > 0 ? { width: `${item.width}rem` } : undefined,
    component: node,
  }
}
