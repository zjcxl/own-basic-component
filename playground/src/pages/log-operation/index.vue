<script setup lang="ts">
import { ref } from 'vue'
import { BaseTableHelper } from '@own-basic-component/ui-naive'
import { search } from './search'
import { columns } from './columns'
import logOperationApiRequest from '~/module/log-operation/log-operation-api'

const baseTableHelper1 = ref<InstanceType<typeof BaseTableHelper>>()

const keywords = ref('')
const methodName = ref('')

/**
 * 刷新页面的方法
 */
function handleRefresh() {
  baseTableHelper1.value?.refresh()
}

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
  <BaseTableHelper
    ref="baseTableHelper1"
    :columns="columns"
    :search="search"
    :fetch-method="logOperationApiRequest.page"
    :before-fetch="beforeFetch"
    :row-key="row => row.id"
    :pagination="false"
    :bordered="false"
    :default-rows="25"
  >
    <!--    <template #search> -->
    <!--      <NInput v-model:value="keywords" placeholder="请输入关键字" @keyup.enter="handleRefresh" /> -->
    <!--      <NInput v-model:value="methodName" placeholder="请输入查询的方法名（全限定名）" @keyup.enter="handleRefresh" /> -->
    <!--    </template> -->
  </BaseTableHelper>
</template>

<style scoped lang="scss">

</style>
