<script lang="ts" setup generic="T">
import { type PropType, ref } from 'vue'
import { baseTableProps } from '../common'
import type { FetchMethodType, TableInstanceType, TableSlotsType } from '../common'
import BaseRealTableHelper from './BaseRealTableHelper.vue'

const props = defineProps({
  ...baseTableProps,
  // 请求方法
  fetchMethod: Function as PropType<FetchMethodType<T>>,
})

defineSlots<TableSlotsType<T>>()

const baseTableHelper = ref<TableInstanceType<T>>()

// 刷新的方法
function refresh(pageInit: number | boolean = false): void {
  baseTableHelper.value!.refresh(pageInit)
}
// 获取列表数据
const getDataList = () => baseTableHelper.value!.getDataList()
// 暴露方法
defineExpose({ refresh, getDataList })
</script>

<template>
  <BaseRealTableHelper v-bind="props" ref="baseTableHelper" helper-type="list">
    <template #search>
      <slot name="search" />
    </template>
    <template #operation>
      <slot name="operation" />
    </template>
    <template #data="{ list }">
      <slot name="data" :list="list as T[]" />
    </template>
  </BaseRealTableHelper>
</template>
