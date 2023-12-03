<script setup lang="ts">
import { ref } from 'vue'
import type { TableInstanceType } from '@own-basic-component/ui-naive'
import { BaseTableListHelper } from '@own-basic-component/ui-naive'
import { search } from '../log-operation/search'
import { columns } from '../log-operation/columns'
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
</script>

<template>
  <BaseTableListHelper
    ref="baseTableHelper"
    :columns="columns"
    :search="search"
    :fetch-method="logOperationApiRequest.page"
    :before-fetch="beforeFetch"
    :row-key="row => row.id"
    :pagination="false"
    :bordered="false"
    :default-rows="25"
  >
    <template #data="{ list }">
      <div v-for="(item, index) in list" :key="index">
        {{ item }}
      </div>
    </template>
  </BaseTableListHelper>
</template>
