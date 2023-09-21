import { dataTableProps } from 'naive-ui'
import { defineComponent, ref } from 'vue'
import { baseTableProps } from '../common'
import { getOperationColumns } from '../common/table-line-operation-check'
import BaseRealTableHelper from './BaseRealTableHelper'

export const tableHelperProps = {
  // naive表格的基础属性
  ...dataTableProps,
  // 自定义的表格属性
  ...baseTableProps,
} as const

const TABLE_OPERATION_KEY = 'table-operation'

export default defineComponent({
  name: 'TableHelper',
  components: {
    BaseRealTableHelper,
  },
  props: tableHelperProps,
  setup(props) {
    // 获取表格
    const officialBaseTableHelper = ref<InstanceType<typeof BaseRealTableHelper>>()
    // 处理操作列信息
    const {
      columns,
    } = props
    // 获取字数
    const oldOperations = columns.find(column => (column as Required<{ key: string }>).key === TABLE_OPERATION_KEY)
    // 判断有没有，如果有的话不用执行
    if (!oldOperations) {
      const column = getOperationColumns(props.operations, props.operationExtra, TABLE_OPERATION_KEY)
      if (column)
        columns.push(column)
    }
    return {
      // 刷新
      refresh: (pageInit: number | boolean = false) => {
        console.log(officialBaseTableHelper)
        console.log(officialBaseTableHelper.value?.refresh)
        return  officialBaseTableHelper.value?.refresh(pageInit)
      },
      // 获取数据
      getDataList: () => officialBaseTableHelper.value?.getDataList(),
      // 表格字段
      columns,
    }
  },
  render() {
    console.log(this.$props)
    return (
      <>
        <BaseRealTableHelper {...this.$props} columns={this.columns} ref='officialBaseTableHelper' helper-type='table' >
          {{
            ...this.$slots,
          }}
        </BaseRealTableHelper>
      </>
    )
  },
})
