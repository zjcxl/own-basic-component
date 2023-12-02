<script lang="ts" setup>
import { ref } from 'vue'
import { getOperationColumns } from '../common/table-line-operation-check'
import { baseTableProps } from '../common'
import BaseRealTableHelper from './BaseRealTableHelper.vue'

const props = defineProps(baseTableProps)

const TABLE_OPERATION_KEY = 'table-operation'

// 基础的baseTableHelper
const officialBaseTableHelper = ref<InstanceType<typeof BaseRealTableHelper>>()
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
  officialBaseTableHelper.value?.refresh(pageInit)
}
// 获取列表数据
const getDataList = () => officialBaseTableHelper.value?.getDataList()

// 暴露方法信息
defineExpose({
  refresh,
  getDataList,
})
</script>

<template>
  <BaseRealTableHelper v-bind="$props" ref="officialBaseTableHelper" :columns="columns" helper-type="table">
    <slot />
  </BaseRealTableHelper>
</template>
