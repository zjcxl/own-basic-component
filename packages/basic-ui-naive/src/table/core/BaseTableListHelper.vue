<script lang="ts" setup generic="T">
import type { PropType } from 'vue'
import { ref } from 'vue'
import { baseTableProps } from '../common'
import type { FetchMethodType, OperationProps, TableInstanceType, TableSlotsType } from '../common'
import BaseRealTableHelper from './BaseRealTableHelper.vue'

const props = defineProps({
  ...baseTableProps,
  // 操作列
  operations: {
    type: Array as PropType<Array<OperationProps<T>>>,
    default: () => [],
  },
  // 请求方法
  fetchMethod: Function as PropType<FetchMethodType<T>>,
})

const slots = defineSlots<TableSlotsType<T>>()

const baseRealTableHelper = ref<TableInstanceType<T>>()

// 刷新的方法
function refresh(pageInit: number | boolean = false): void {
  baseRealTableHelper.value!.refresh(pageInit)
}
// 获取列表数据
const getDataList = () => baseRealTableHelper.value!.getDataList()
// 暴露方法
defineExpose({ refresh, getDataList })
</script>

<template>
  <BaseRealTableHelper v-bind="props" ref="baseRealTableHelper" helper-type="list">
    <template v-if="slots.search" #search>
      <slot name="search" />
    </template>
    <template v-if="slots.operation" #operation>
      <slot name="operation" />
    </template>
    <template v-if="slots.data" #data="{ list }">
      <slot name="data" :list="list as T[]" />
    </template>
  </BaseRealTableHelper>
</template>
