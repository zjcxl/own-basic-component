<script setup lang="ts">
import type { QueryObjectType } from '@own-basic-component/config'
import { BaseTableSearchHelper } from '@own-basic-component/ui-naive'

import { computed } from 'vue'
import { NCode } from 'naive-ui'
import { search } from './search'

const queryParams = ref<QueryObjectType>({})

const queryText = computed<string>(() => JSON.stringify(queryParams.value, null, 2))

const baseTableSearchHelper = ref<InstanceType<typeof BaseTableSearchHelper>>()

/**
 * 显示参数
 * @param query
 */
function consoleLogParams(query: QueryObjectType) {
  queryParams.value = query
}

onMounted(() => {
  queryParams.value = baseTableSearchHelper.value?.getParams?.() || {}
})
</script>

<template>
  <div>
    <BaseTableSearchHelper ref="baseTableSearchHelper" :search="search" @search-action="consoleLogParams" />
  </div>
  <br>
  <n-card title="请求参数">
    <NCode :code="queryText" language="json" show-line-numbers />
  </n-card>
</template>
