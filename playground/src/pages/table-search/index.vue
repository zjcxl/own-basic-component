<script setup lang="ts">
import type { QueryObjectType } from '@own-basic-component/config'
import { BaseTableSearchHelper } from '@own-basic-component/ui-naive'
import { search } from './search'

/**
 * 显示参数
 * @param query
 */
function consoleLogParams(query: QueryObjectType) {
  console.log(query)
}
</script>

<template>
  <BaseTableSearchHelper :search="search" @search-action="consoleLogParams" />
</template>

<style scoped>

</style>
