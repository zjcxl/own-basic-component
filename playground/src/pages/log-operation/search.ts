import type { SearchProps } from '@own-basic-component/ui-naive/src'

export const search: SearchProps[] = [
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
    type: 'select',
    width: 10,
    field: 'status',
    placeholder: '请选择筛选的状态',
    options: [
      { value: 1, label: '成功' },
      { value: 2, label: '失败' },
    ],
  },
]
