import type { VNode } from 'vue'
import type { BaseSearchProps, CustomSearchItem, DefaultSearchPropsType, SearchPropType } from './types'

/**
 * 搜索列表的map
 */
const HANDLE_MAP: Map<SearchPropType, (item: DefaultSearchPropsType, index: number) => CustomSearchItem> = new Map()

/**
 * 注入handler
 * @param type
 * @param method
 */
export function putComponentHandler<TYPE extends SearchPropType, VALUE_TYPE = string, OPTIONS_TYPE = void>(
  type: TYPE | TYPE[],
  method: (item: BaseSearchProps<TYPE, VALUE_TYPE, OPTIONS_TYPE>, index: number) => CustomSearchItem,
) {
  if (Array.isArray(type)) {
    type.forEach((item) => {
      HANDLE_MAP.set(item, method)
    })
    return
  }
  HANDLE_MAP.set(type, method)
}

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
export function calcSearchItems(array: DefaultSearchPropsType[]): CustomSearchItem[] {
  return array
    .map((item, index) => {
      return HANDLE_MAP.get(item.type)?.(item, index)
    })
    .filter(item => !!item) as CustomSearchItem[]
}

/**
 * 包装查询内容
 * @param item 查询项
 * @param node 节点
 */
export function encasementSearchItem(item: DefaultSearchPropsType, node: VNode): CustomSearchItem {
  return {
    style: item.width && item.width > 0 ? { width: `${item.width}rem` } : undefined,
    component: node,
  }
}
