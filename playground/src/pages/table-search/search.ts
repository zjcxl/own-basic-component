import type { DefaultSearchPropsValueType } from '@own-basic-component/ui-naive'

export const search: DefaultSearchPropsValueType[] = [
  {
    type: 'date-time-picker',
    width: 15,
    field: 'requestTime',
    placeholder: '请输入查询的时间',
    extra: {
      format: 'yyyy-MM-dd HH:mm:ss',
    },
  },
  {
    type: 'date-time-range-picker',
    width: 25,
    field: 'requestTime',
    defaultValue: [1706058267000, 1706058267000],
    placeholder: '请输入查询的时间',
    extra: {
      format: 'yyyy-MM-dd HH:mm',
    },
  },
  {
    type: 'select',
    width: 10,
    field: 'status',
    placeholder: '请选择筛选的状态',
    extra: {
      options: [
        {
          key: 1,
          value: 1,
          label: '成功',
        },
        {
          key: 2,
          value: 2,
          label: '失败',
        },
      ],
    },
  },
  {
    type: 'select',
    width: 20,
    field: 'client',
    placeholder: '请选择筛选的客户端',
    extra: {
      allowDynamicAdd: true,
      options: [
        {
          key: 1,
          value: 'apifox',
          label: 'apifox',
        },
        {
          key: 2,
          value: 'client1',
          label: 'client1',
        },
        {
          key: 3,
          value: 'client2',
          label: 'client2',
        },
      ],
    },
  },
  {
    type: 'input',
    width: 20,
    field: 'keyword',
    placeholder: '请输入查询的关键字',
  },
  {
    type: 'input',
    width: 20,
    hidden: true,
    field: 'keyword2',
    placeholder: '请输入查询的关键字',
  },
  {
    type: 'number',
    width: 20,
    hidden: true,
    field: 'keyword3',
    placeholder: '请输入查询的关键字',
  },
]
