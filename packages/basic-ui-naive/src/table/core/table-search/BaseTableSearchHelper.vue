<script lang="ts" setup>
import type { RendererElement, RendererNode, VNode } from 'vue'
import { computed, defineProps, onMounted, ref, useSlots } from 'vue'
import { NButton, NDivider, NSpace } from 'naive-ui'
import { SearchOutline } from '@vicons/ionicons5'
import type { SearchExtra, SearchProps, SearchValueData } from '.'
import { calcSearchItems } from '.'

const props = defineProps<{
  // 搜索栏的配置
  search: Array<SearchProps>
  // 搜索栏的额外参数
  searchExtra: SearchExtra
}>()

const emits = defineEmits<{
  searchAction: []
}>()

const values = ref<SearchValueData>({
  data: {},
})

const slots = useSlots()

const needDivider = computed<boolean>(() => !!slots.operation)

const itemList = computed<(VNode<RendererNode, RendererElement, { [p: string]: any }> | undefined)[]>(() => calcSearchItems(props.search, values.value))
console.log(itemList.value)
function handleClickSearch() {
  emits('searchAction')
}

onMounted(() => {
  props.search.forEach((item) => {
    values.value.data[item.field] = undefined
  })
})
</script>

<template>
  <NSpace align="center" justify="start">
    <div v-for="(item, index) in itemList" :key="index">
      <component :is="item" />
    </div>
    <slot name="search" />
    <NButton type="primary" @click="handleClickSearch">
      <template #default>
        {{ searchExtra?.searchButtonText || '搜索' }}
      </template>
      <template #icon>
        <SearchOutline />
      </template>
    </NButton>
    <NDivider v-if="needDivider" vertical />
    <slot name="operation" />
  </NSpace>
</template>
