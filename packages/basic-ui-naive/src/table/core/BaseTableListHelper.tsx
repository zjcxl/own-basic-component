import { defineComponent, ref } from 'vue'
import { baseTableProps } from '../common'
import BaseRealTableHelper from './BaseRealTableHelper'

export const tableListHelperProps = {
  // 自定义的表格属性
  ...baseTableProps,
} as const

export default defineComponent({
  name: 'TableListHelper',
  components: {
    BaseRealTableHelper,
  },
  props: tableListHelperProps,
  setup() {
    const baseTableHelper = ref<InstanceType<typeof BaseRealTableHelper>>()
    return {
      // 刷新
      refresh: (pageInit: number | boolean = false) => baseTableHelper.value?.refresh(pageInit),
      // 获取数据
      getDataList: () => baseTableHelper.value?.getDataList(),
    }
  },
  render() {
    console.log(this.$props)
    return (
      <>
        <BaseRealTableHelper {...this.$props} ref='baseTableHelper' helper-type='list'>
          {{
            ...this.$slots,
          }}
        </BaseRealTableHelper>
      </>
    )
  },
})
