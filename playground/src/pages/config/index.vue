<script setup lang="ts">
import type { ProjectConfig, RequestConfig } from '@own-basic-component/config'
import { defineProjectConfig, defineRequestConfig, getProjectConfig, getRequestConfig } from '@own-basic-component/config'

defineProjectConfig({
  baseUrl: '/api/test',
  request: {
    mergeType: 'merge',
    timeout: 1000,
    success: [
      'success',
    ],
  },
})

defineRequestConfig({
  mergeType: 'merge',
  success: [
    'success2',
  ],
})

const projectConfig = computed<ProjectConfig>(() => getProjectConfig())
const requestConfig = computed<RequestConfig>(() => getRequestConfig())

const projectConfigText = computed<string>(() => JSON.stringify(projectConfig.value, null, 2))
const requestConfigText = computed<string>(() => JSON.stringify(requestConfig.value, null, 2))
</script>

<template>
  <div class="flex flex-col gap-2">
    <n-card title="项目配置参数">
      <NCode :code="projectConfigText" language="json" show-line-numbers />
    </n-card>
    <n-card title="请求配置参数">
      <NCode :code="requestConfigText" language="json" show-line-numbers />
    </n-card>
  </div>
</template>
