'use strict'

import type { VNode } from 'vue'
import { h } from 'vue'
import OwnDatePicker from './component/OwnDatePicker.vue'
import OwnDateRangePicker from './component/OwnDateRangePicker.vue'
import OwnDateTimePicker from './component/OwnDateTimePicker.vue'
import OwnDateTimeRangePicker from './component/OwnDateTimeRangePicker.vue'
import OwnInput from './component/OwnInput.vue'
import OwnSearchSelect from './component/OwnSearchSelect.vue'
import type {
  CustomSearchItem,
  SearchPropType,
  SearchProps,
  datePickerSearchPropsType,
  dateRangePickerSearchPropsType,
  dateTimePickerSearchPropsType,
  dateTimeRangePickerSearchPropsType,
  selectSearchPropsType,
} from './search-props'
import {
  SEARCH_PROP_TYPE_DATE_PICKER,

  SEARCH_PROP_TYPE_DATE_RANGE_PICKER,
  SEARCH_PROP_TYPE_DATE_TIME_PICKER,
  SEARCH_PROP_TYPE_DATE_TIME_RANGE_PICKER,
  SEARCH_PROP_TYPE_SELECT,
  SEARCH_PROP_TYPE_TEXT,
} from './search-props'

/**
 * 搜索列表的map
 */
const HANDLE_MAP: Map<SearchPropType, (item: SearchProps, index: number) => CustomSearchItem> = new Map()

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
    Math.ceil(rows / 2),
    rows,
    Math.ceil(rows * 1.5),
    Math.ceil(rows * 2),
    Math.ceil(rows * 3),
    Math.ceil(rows * 5),
    Math.ceil(rows * 10),
  ])]
    .map(item => Math.max(item, max))
    .filter(item => item > 0)
    .sort((a, b) => a - b)
}

/**
 * 注入文字搜索的模板
 */
HANDLE_MAP.set(SEARCH_PROP_TYPE_TEXT, (item, index) => {
  return encasementSearchItem(item, h(OwnInput, {
    defaultValue: item.defaultValue,
    index,
    field: item.field,
    placeholder: item.placeholder,
  }))
})

/**
 * 添加下拉搜索的模板
 */
HANDLE_MAP.set(SEARCH_PROP_TYPE_SELECT, (item: SearchProps, index) => {
  return encasementSearchItem(item, h(OwnSearchSelect, {
    defaultValue: item.defaultValue,
    index,
    placeholder: item.placeholder,
    field: item.field,
    options: (item as selectSearchPropsType).options,
  }))
})

/**
 * 添加日期的模板
 */
HANDLE_MAP.set(SEARCH_PROP_TYPE_DATE_PICKER, (item: SearchProps, index) => {
  return encasementSearchItem(item, h(OwnDatePicker, {
    defaultValue: item.defaultValue,
    index,
    placeholder: item.placeholder,
    field: item.field,
    options: (item as datePickerSearchPropsType).options,
  }))
})
HANDLE_MAP.set(SEARCH_PROP_TYPE_DATE_RANGE_PICKER, (item: SearchProps, index) => {
  return encasementSearchItem(item, h(OwnDateRangePicker, {
    defaultValue: item.defaultValue,
    index,
    placeholder: item.placeholder,
    field: item.field,
    options: (item as dateRangePickerSearchPropsType).options,
  }))
})
HANDLE_MAP.set(SEARCH_PROP_TYPE_DATE_TIME_PICKER, (item: SearchProps, index) => {
  return encasementSearchItem(item, h(OwnDateTimePicker, {
    defaultValue: item.defaultValue,
    index,
    placeholder: item.placeholder,
    field: item.field,
    options: (item as dateTimePickerSearchPropsType).options,
  }))
})
HANDLE_MAP.set(SEARCH_PROP_TYPE_DATE_TIME_RANGE_PICKER, (item: SearchProps, index) => {
  return encasementSearchItem(item, h(OwnDateTimeRangePicker, {
    defaultValue: (item as dateTimeRangePickerSearchPropsType).defaultValue,
    index,
    placeholder: item.placeholder,
    field: item.field,
    options: (item as dateTimeRangePickerSearchPropsType).options,
  }))
})

/**
 * 计算查询项
 * @param array 查询项
 * @param values 查询值
 */
export function calcSearchItems(array: SearchProps[]): CustomSearchItem[] {
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
export function encasementSearchItem(item: SearchProps, node: VNode): CustomSearchItem {
  return {
    style: item.width && item.width > 0 ? { width: `${item.width}rem` } : undefined,
    component: node,
  }
}
