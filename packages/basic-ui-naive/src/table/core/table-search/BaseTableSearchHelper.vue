<script lang="ts" setup>
import type { QueryObjectType } from '@own-basic-component/config'
import { computed, defineProps, onMounted, ref } from 'vue'
import { NButton, NDivider, NSpace } from 'naive-ui'
import { SearchOutline } from '@vicons/ionicons5'
import type { CustomSearchItem, SearchExtra, SearchProps, SearchValueData } from '.'
import { calcSearchItems } from '.'

const props = defineProps<{
  // 搜索栏的配置
  search: Array<SearchProps>
  // 搜索栏的额外参数
  searchExtra: SearchExtra
}>()

const emits = defineEmits<{
  searchAction: [QueryObjectType]
}>()

const slots = defineSlots<{
  search?: any
  operation?: any
}>()

const values = ref<SearchValueData>({
  data: {},
})

const componentItemList = ref<{
  getParams?: () => QueryObjectType
}[]>([])

const hasOperation = computed<boolean>(() => !!slots.operation)

const itemList = computed<CustomSearchItem[]>(() => calcSearchItems(props.search, values.value))

/**
 * 点击搜索按钮的事件
 */
function handleClickSearch() {
  emits('searchAction', getParams())
}

/**
 * 获取请求参数
 */
function getParams(): QueryObjectType {
  let params: QueryObjectType = {}
  componentItemList.value.forEach((item) => {
    params = {
      ...params,
      ...item.getParams?.(),
    }
  })
  return params
}

defineExpose({
  getParams,
})

onMounted(() => {
  props.search.forEach((item) => {
    values.value.data[item.field] = undefined
  })
})
</script>

<template>
  <NSpace align="center" justify="start">
    <div v-for="(item, index) in itemList" :key="index" :style="item.style">
      <component :is="item.component" ref="componentItemList" @search-action="handleClickSearch" />
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
    <template v-if="hasOperation">
      <NDivider vertical />
      <slot name="operation" />
    </template>
  </NSpace>
</template>
