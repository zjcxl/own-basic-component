import { dataTableProps } from 'naive-ui'
import type { PropType } from 'vue'
import type { DefaultSearchPropsValueType, SearchExtra } from '../table-search'
import type { OperationExtra, OperationProps } from './operation-props'
import type { BeforeFetchMethodType, DefaultParamsType, RowDataType } from './types'

export const searchProps = {
  // 搜索栏的配置
  search: {
    type: Array as PropType<Array<DefaultSearchPropsValueType>>,
    default: () => [],
  },
  // 搜索栏的额外参数
  searchExtra: {
    type: Object as PropType<SearchExtra>,
    default: () => {
    },
  },
} as const

// 操作栏的属性
export const operationProps = {
  // 操作列
  operations: {
    type: Array as PropType<Array<OperationProps<RowDataType>>>,
    default: () => [],
  },
  // 操作列额外参数
  operationExtra: {
    type: Object as PropType<OperationExtra>,
    default: () => {
    },
  },
} as const

// 基础的表格的属性
export const baseTableProps = {
  // 分隔栏名称
  dividerName: {
    type: String,
    default: '数据列表',
  },
  // 搜索栏参数
  ...searchProps,
  // 操作栏参数
  ...operationProps,
  // 初始页数
  defaultPage: {
    type: Number,
    default: 1,
  },
  // 默认的每页数量
  defaultRows: {
    type: Number,
    default: 10,
  },
  // 默认的最大分页数量
  maxRows: {
    type: Number,
    default: 100,
  },
  // 默认的参数
  defaultParams: {
    type: Object as PropType<DefaultParamsType>,
    default: () => ({}),
  },
  // 获取数据之前的方法
  beforeFetch: {
    type: Function as PropType<BeforeFetchMethodType>,
    default: () => Promise.resolve({}),
  },
  ...dataTableProps,
} as const
