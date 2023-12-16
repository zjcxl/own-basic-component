<script setup lang="ts">
import type { OperationProps } from '@own-basic-component/ui-naive/src'
import { ref } from 'vue'
import type { TableInstanceType } from '@own-basic-component/ui-naive'
import { BaseTableHelper } from '@own-basic-component/ui-naive'
import { search } from './search'
import { columns } from './columns'
import type { LogOperationVo } from '~/module/log-operation/log-operation-vo'
import logOperationApiRequest from '~/module/log-operation/log-operation-api'

const baseTableHelper = ref<TableInstanceType<LogOperationVo>>()

const keywords = ref('')
const methodName = ref('')

/**
 * 查询前参数获取
 */
function beforeFetch() {
  const data: Record<string, any> = {}
  if (keywords.value)
    data.keywords = keywords.value
  if (methodName.value)
    data.methodName = methodName.value
  return Promise.resolve(data)
}

// 操作列
const operationColumn: OperationProps<LogOperationVo>[] = [
  {
    title: '详情',
    action: (record) => {
      // 打开详情面板
      console.log(record)
    },
  },
]
</script>

<template>
  <BaseTableHelper
    ref="baseTableHelper"
    :columns="columns"
    :search="search"
    :fetch-method="logOperationApiRequest.page"
    :before-fetch="beforeFetch"
    :operations="operationColumn"
    :row-key="row => row.id"
    :pagination="false"
    :bordered="false"
    :default-rows="25"
  />
</template>
