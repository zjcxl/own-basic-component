import type { DataTableColumns } from 'naive-ui'
import { NTag } from 'naive-ui'
import type { LogOperationVo } from '~/module/log-operation/log-operation-vo'

export const columns: DataTableColumns<LogOperationVo> = [
  {
    title: '#',
    key: 'key',
    width: 50,
    align: 'center',
    fixed: 'left',
    render: (_, index) => index + 1,
  },
  // {
  //   title: '返回编码',
  //   key: 'code',
  //   width: 120,
  //   render: vo => [vo.code, vo.message].filter(item => !!item).join(':'),
  // },
  {
    title: '用户名',
    key: 'userName',
    width: 120,
    align: 'center',
  },
  {
    title: '状态',
    key: 'status',
    width: 80,
    align: 'center',
    render: (row) => {
      if (row.status === 1)
        return h(NTag, { type: 'success', size: 'small', bordered: false }, { default: () => '成功' })
      if (row.status === 2)
        return h(NTag, { type: 'error', size: 'small', bordered: false }, { default: () => '失败' })
    },
  },
  {
    title: '方法名',
    key: 'methodName',
    align: 'center',
    width: 200,
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: '客户端',
    key: 'client',
    width: 120,
    align: 'center',
  },
  {
    title: 'ip',
    key: 'ip',
    width: 160,
    align: 'center',
  },
  // {
  //   title: '额外信息',
  //   key: 'extra',
  //   width: 160,
  //   align: 'center',
  //   ellipsis: {
  //     tooltip: true,
  //   },
  // },
  {
    title: '模块名称',
    key: 'moduleName',
    width: 160,
    align: 'center',
  },
  {
    title: '操作名称',
    key: 'operationName',
    width: 160,
    align: 'center',
  },
  {
    title: '请求时间',
    key: 'requestTime',
    width: 200,
    align: 'center',
  },
  // {
  //   title: '请求参数',
  //   key: 'requestParams',
  //   align: 'center',
  //   width: 200,
  //   ellipsis: {
  //     tooltip: true,
  //   },
  // },
  {
    title: '响应时间',
    key: 'responseTime',
    width: 200,
    align: 'center',
  },
  // {
  //   title: '响应参数',
  //   key: 'responseParams',
  //   align: 'center',
  //   width: 200,
  //   ellipsis: {
  //     tooltip: true,
  //   },
  //   render: (vo) => {
  //     if (vo.status !== 1)
  //       return ''
  //     const responseParams = JSON.parse(vo.responseParams)
  //     // return h('pre', {}, { default: () => JSON.stringify(JSON.parse(responseParams.result), null, 2) })
  //     return responseParams.result
  //   },
  // },
]
