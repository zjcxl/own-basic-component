import { defineComponent, ref } from 'vue'
import { baseTableProps } from '../common'
import BaseTableHelper from './BaseTableHelper'

export const tableListHelperProps = {
  // 自定义的表格属性
  ...baseTableProps,
} as const

export default defineComponent({
  name: 'TableListHelper',
  components: {
    BaseTableHelper,
  },
  props: tableListHelperProps,
  setup() {
    const baseTableHelper = ref<InstanceType<typeof BaseTableHelper>>()
    return {
      // 刷新
      refresh: (pageInit: number | boolean = false) => baseTableHelper.value?.refresh(pageInit),
      // 获取数据
      getDataList: () => baseTableHelper.value?.getDataList(),
    }
  },
  render() {
    return (
      <>
        <BaseTableHelper {...this.$props} ref='baseTableHelper' helper-type='list'>
          {{
            ...this.$slots,
          }}
        </BaseTableHelper>
      </>
    )
  },
})
