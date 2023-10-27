'use strict'

import { NInput } from 'naive-ui'
import type { VNode } from 'vue'
import { h } from 'vue'
import OwnSearchSelect from '../core/component/OwnSearchSelect.vue'
import { SEARCH_PROP_TYPE_SELECT, SEARCH_PROP_TYPE_TEXT } from './search-props'
import type { SearchProps, SearchValueData } from './search-props'

/**
 * 计算分页的大小信息
 * @param rows 每页的大小
 * @param max 最大的大小
 */
export function calcPageSizes(rows: number, max = 100) {
  // 验证数据
  rows = Math.max(rows, 1)
  // 计算
  return [...new Set([
    Math.ceil(rows / 2),
    rows,
    Math.ceil(rows * 1.5),
    Math.ceil(rows * 2),
    Math.ceil(rows * 3),
    Math.ceil(rows * 5),
    Math.ceil(rows * 10),
  ])]
    .filter(item => item > 0)
    .filter(item => item <= max)
    .sort((a, b) => a - b)
}

const HANDLE_MAP: Map<string, (item: SearchProps, values: SearchValueData, index: number) => VNode > = new Map()

HANDLE_MAP.set(SEARCH_PROP_TYPE_TEXT, (item, values, index) => {
  return encasementSearchItem(item, h(NInput, {
    value: values.data[item.field],
    key: index,
    placeholder: item.placeholder,
  }))
})

HANDLE_MAP.set(SEARCH_PROP_TYPE_SELECT, (item, values, index) => {
  return encasementSearchItem(item, h(OwnSearchSelect, {
    value: values.data[item.field],
    index,
    placeholder: item.placeholder,
    options: item.options,
  }))
})

/**
 * 计算查询项
 * @param array 查询项
 * @param values 查询值
 */
export function calcSearchItems(array: SearchProps[], values: SearchValueData) {
  return array
    .map((item, index) => {
      return HANDLE_MAP.get(item.type)?.(item, values, index)
    })
    .filter(item => !!item)
}

/**
 * 包装查询内容
 * @param item 查询项
 * @param node 节点
 */
export function encasementSearchItem(item: SearchProps, node: VNode): VNode {
  if (item.width && item.width > 0) {
    return h('div', {
      style: { width: `${item.width}rem` },
    }, node)
  }
  return node
}
