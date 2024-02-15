<script lang="ts" setup generic="T">
import { type PropType, ref } from 'vue'
import { baseTableProps, getOperationColumns } from '../common'
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

const TABLE_OPERATION_KEY = 'table-operation'

// 基础的baseTableHelper
const baseTableHelper = ref<TableInstanceType<T>>()
// 处理操作列信息
const { columns } = props
// 获取字数
const oldOperations = columns.find(column => (column as Required<{ key: string }>).key === TABLE_OPERATION_KEY)
// 判断有没有，如果有的话不用执行
if (!oldOperations) {
  const column = getOperationColumns(props.operations, props.operationExtra, TABLE_OPERATION_KEY)
  if (column)
    columns.push(column)
}
// 刷新的方法
function refresh(pageInit: number | boolean = false): void {
  baseTableHelper.value!.refresh(pageInit)
}
// 获取列表数据
const getDataList = () => baseTableHelper.value!.getDataList()

// 暴露方法信息
defineExpose<TableInstanceType<T>>({
  refresh,
  getDataList,
})
</script>

<template>
  <BaseRealTableHelper v-bind="props" ref="baseTableHelper" :columns="columns" helper-type="table">
    <template v-if="slots.search" #search>
      <slot name="search" />
    </template>
    <template v-if="slots.operation" #operation>
      <slot name="operation" />
    </template>
  </BaseRealTableHelper>
</template>
