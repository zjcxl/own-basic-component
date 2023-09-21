<script setup lang="ts">
import { BaseTableHelper } from '@own-basic-component/ui-naive'

const columns = [
  {
    title: 'No',
    key: 'no',
  },
  {
    title: 'Title',
    key: 'title',
  },
]

const data = Array.from({ length: 3 }).fill(false).map((item, index) => {
  return {
    no: index,
    title: `title${index}`,
  }
})
</script>

<template>
  <div />
  <BaseTableHelper :columns="columns" :data="data" />
</template>

<style scoped>

</style>
