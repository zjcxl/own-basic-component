<script lang="ts" setup>
import type { QueryObjectType } from '@own-basic-component/config'
import { RefreshOutline, SearchOutline } from '@vicons/ionicons5'
import { NButton, NDivider, NSpace } from 'naive-ui'
import { computed, defineProps, nextTick, ref } from 'vue'
import type { CustomSearchItem, DefaultSearchPropsValueType, SearchExtra } from '.'
import { calcSearchItems } from '.'

const props = defineProps<{
  // 搜索栏的配置
  search: Array<DefaultSearchPropsValueType>
  // 搜索栏的额外参数
  searchExtra: SearchExtra
}>()

const emits = defineEmits<{
  searchAction: [QueryObjectType]
}>()

const slots = defineSlots<{
  search?: () => any
  operation?: () => any
}>()

const componentItemMainList = ref<{
  getParams?: () => QueryObjectType
}[]>([])

const componentItemMinorList = ref<{
  getParams?: () => QueryObjectType
}[]>([])

const visibleMinorList = ref<boolean>(false)

/**
 * 主要信息的渲染项
 */
const itemMainList = computed<CustomSearchItem[]>(() => calcSearchItems(props.search.filter(item => !item.hidden)))
/**
 * 次要信息的渲染项
 */
const itemMinorList = computed<CustomSearchItem[]>(() => calcSearchItems(props.search.filter(item => item.hidden)))

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
  componentItemMainList.value.forEach((item) => {
    params = {
      ...params,
      ...item.getParams?.(),
    }
  })
  componentItemMinorList.value?.forEach((item) => {
    params = {
      ...params,
      ...item.getParams?.(),
    }
  })
  return params
}

const visible = ref<boolean>(true)

/**
 * 重置搜索栏
 */
function handleReset() {
  visible.value = false
  nextTick(() => {
    visible.value = true
    nextTick(() => {
      handleClickSearch()
    })
  })
}

defineExpose({
  getParams,
})
</script>

<template>
  <template v-if="visible">
    <NSpace align="center" justify="start">
      <div v-for="(item, index) in itemMainList" :key="index" :style="item.style">
        <component :is="item.component" ref="componentItemMainList" @search-action="handleClickSearch" />
      </div>
      <template v-if="slots.search">
        <slot name="search" />
      </template>
      <NButton type="primary" @click="handleClickSearch">
        <template #default>
          {{ searchExtra?.searchButtonText || '搜索' }}
        </template>
        <template #icon>
          <SearchOutline />
        </template>
      </NButton>
      <NButton type="primary" @click="handleReset">
        <template #default>
          重置
        </template>
        <template #icon>
          <RefreshOutline />
        </template>
      </NButton>
      <NButton v-if="itemMinorList.length > 0" quaternary type="success" @click="visibleMinorList = !visibleMinorList">
        {{ visibleMinorList ? '收起更多' : '展开更多' }}
      </NButton>
      <template v-if="slots.operation">
        <NDivider vertical />
        <slot name="operation" />
      </template>
    </NSpace>
    <br v-show="visibleMinorList && itemMinorList.length > 0">
    <NSpace v-show="visibleMinorList && itemMinorList.length > 0" align="center" justify="start">
      <div v-for="(item, index) in itemMinorList" :key="index" :style="item.style">
        <component :is="item.component" ref="componentItemMinorList" @search-action="handleClickSearch" />
      </div>
    </NSpace>
  </template>
</template>
