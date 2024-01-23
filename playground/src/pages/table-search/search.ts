import type { SearchProps } from '@own-basic-component/ui-naive/src'

export const search: SearchProps[] = [
  {
    type: 'text',
    width: 20,
    field: 'traceId',
    placeholder: '请输入查询的链路追踪（右模糊）',
  },
  {
    type: 'text',
    width: 20,
    field: 'methodName',
    placeholder: '请输入查询的方法名（全限定名）',
  },
  {
    type: 'text',
    width: 20,
    field: 'moduleName',
    placeholder: '请输入查询的模块名称',
  },
  {
    type: 'text',
    width: 20,
    field: 'operationName',
    placeholder: '请输入查询的方法操作名称',
  },
  {
    type: 'date-time-range-picker',
    width: 20,
    field: 'requestTime',
    placeholder: '请输入查询的方法操作名称',
    options: {
      format: 'yyyy-MM-dd HH:mm',
    },
  },
  {
    type: 'select',
    width: 10,
    field: 'status',
    placeholder: '请选择筛选的状态',
    options: [
      { key: 1, value: 1, label: '成功' },
      { key: 2, value: 2, label: '失败' },
    ],
  },
]