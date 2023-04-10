<script setup lang="ts">
import type { ProjectConfig, RequestConfig } from '@own-basic-component/config'
import { defineProjectConfig, defineRequestConfig, getProjectConfig, getRequestConfig } from '@own-basic-component/config'
import { computed } from 'vue'

defineRequestConfig({
  mergeType: 'merge',
  success: ['success2'],
})

defineProjectConfig({
  baseUrl: '/api/test',
  request: {
    mergeType: 'merge',
    timeout: 1000,
    success: ['success'],
  },
})

// config配置信息
const projectConfig = computed<ProjectConfig>(() => getProjectConfig())
const requestConfig = computed<RequestConfig>(() => getRequestConfig())
console.log(projectConfig.value)
console.log(requestConfig.value)
</script>

<template>
  <div>
    <div>PROJECT_CONFIG: <code>{{ projectConfig }}</code></div>
    <br>
    <div>REQUEST_CONFIG: <code>{{ requestConfig }}</code></div>
  </div>
</template>

<style scoped>
</style>
