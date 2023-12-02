<script lang="ts">
import { defineComponent, ref } from 'vue'
import { baseTableProps } from '../common'
import BaseRealTableHelper from './BaseRealTableHelper.vue'

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
  setup(_, { expose }) {
    const baseTableHelper = ref<InstanceType<typeof BaseRealTableHelper>>()
    // 刷新的方法
    const refresh = (pageInit: number | boolean = false): void => {
      baseTableHelper.value?.refresh(pageInit)
    }
    // 获取列表数据
    const getDataList = () => baseTableHelper.value?.getDataList()
    // 暴露方法
    expose({ refresh, getDataList })

    return { baseTableHelper }
  },
})
</script>

<template>
  <BaseRealTableHelper v-bind="$props" ref="baseTableHelper" helper-type="list">
    {{ $slots }}
  </BaseRealTableHelper>
</template>
