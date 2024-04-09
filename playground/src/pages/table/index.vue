<script setup lang="ts">
import { BaseTableHelper } from '@own-basic-component/ui-naive'
import { onMounted, ref } from 'vue'

interface DataType {
  no: string
  title: string
}

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

const dataList = ref<DataType[]>([])

onMounted(() => {
  dataList.value.push(
    ...Array.from({ length: 3 }).map((_, index) => {
      return {
        no: `${index}`,
        title: `title${index}`,
      }
    }),
  )
})
</script>

<template>
  <br>
  <BaseTableHelper :columns="columns" :data="dataList">
    <template #operation />
  </BaseTableHelper>
  <br>
</template>
