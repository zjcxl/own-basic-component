<script setup lang="ts">
import { ref } from 'vue'
import { BaseTableHelper } from '@own-basic-component/ui-naive'
import { columns } from './columns'
import logOperationApiRequest from '~/module/log-operation/log-operation-api'

const baseTableHelper1 = ref<InstanceType<typeof BaseTableHelper>>()

// function refresh() {
//   baseTableHelper1.value?.refresh()
// }
</script>

<template>
  <BaseTableHelper
    ref="baseTableHelper1"
    :columns="columns"
    :fetch-method="logOperationApiRequest.page"
    :row-key="row => row.id"
    :pagination="false"
    :bordered="false"
    :default-rows="25"
  >
    <!--    <template #search> -->
    <!--      <NInput v-model:value="keywords" placeholder="请输入关键字" @keyup.enter="refresh" /> -->
    <!--    </template> -->
  </BaseTableHelper>
</template>

<style scoped lang="scss">

</style>
