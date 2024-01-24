import type { DefaultSearchPropsValueType } from '@own-basic-component/ui-naive'

export const search: DefaultSearchPropsValueType[] = [
  {
    type: 'input',
    width: 20,
    field: 'traceId',
    placeholder: '请输入查询的链路追踪（右模糊）',
  },
  {
    type: 'input',
    width: 20,
    field: 'methodName',
    placeholder: '请输入查询的方法名（全限定名）',
  },
  {
    type: 'input',
    width: 20,
    field: 'moduleName',
    placeholder: '请输入查询的模块名称',
  },
  {
    type: 'input',
    width: 20,
    field: 'operationName',
    placeholder: '请输入查询的方法操作名称',
  },
  {
    type: 'date-time-range-picker',
    width: 20,
    field: 'requestTime',
    defaultValue: [1706058267000, 1706058267000],
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
