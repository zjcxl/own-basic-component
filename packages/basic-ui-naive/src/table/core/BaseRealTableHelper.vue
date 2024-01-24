<script lang="ts" setup generic="T">
import type { QueryObjectType } from '@own-basic-component/config'
import { NDataTable, NDivider, NPagination, NSpace, dataTableProps } from 'naive-ui'
import type { PropType, UnwrapRef } from 'vue'
import { computed, defineSlots, onMounted, reactive, ref, unref } from 'vue'
import type { FetchMethodType, PageInfo, RowDataType, TableInstanceType, TableSlotsType } from '../common'
import { baseTableProps } from '../common'
import { BaseTableSearchHelper, calcPageSizes } from '../table-search'

const props = defineProps({
  // naive表格的基础属性
  ...dataTableProps,
  // 自定义的表格属性
  ...baseTableProps,
  // 请求方法
  fetchMethod: Function as PropType<FetchMethodType<T>>,
  // 列表还是表格
  helperType: {
    type: String as PropType<'table' | 'list'>,
    default: 'table',
  },
})

const slots = defineSlots<TableSlotsType<T>>()

// 定义默认的rows
const defaultRows = unref(props.defaultRows)

const baseTableSearchHelper = ref<InstanceType<typeof BaseTableSearchHelper>>()

// 定义分页的参数信息
const pageInfo = reactive<PageInfo>({
  page: unref(props.defaultPage),
  rows: unref(props.defaultRows),
  total: 0,
})

// 定义数据列
const dataList = ref<T[]>([])

// 分页大小数组
const pageSizes = computed<Array<number>>(() => calcPageSizes(defaultRows, props.maxRows))

/**
 * 获取数据的方法
 */
async function fetchData(params?: QueryObjectType, page: number = pageInfo.page) {
  // 判断参数的来源信息
  params = params || baseTableSearchHelper.value?.getParams() || {}
  const beforeParams = await props.beforeFetch()
  // 混合请求参数
  props.fetchMethod?.({
    // 默认的参数
    ...props.defaultParams,
    ...beforeParams,
    ...params,
    page,
    rows: pageInfo.rows,
  }).then(({ data }) => {
    pageInfo.page = data.page
    pageInfo.rows = data.rows
    pageInfo.total = data.total
    dataList.value.splice(0, dataList.value.length, ...data.list as UnwrapRef<T[]>)
  })
}

/**
 * 修改页数的方法
 * @param page
 */
async function handleChangePage(page: number) {
  pageInfo.page = Math.max(page, 1)
  await fetchData()
}

/**
 * 修改分页大小的方法
 * @param rows
 */
async function handleChangePageSize(rows: number) {
  pageInfo.rows = Math.max(rows, 1)
  // 需要将页数重置为1
  pageInfo.page = 1
  await fetchData()
}

/**
 * 刷新数据的方法
 * @param pageInit
 */
function refresh(pageInit: number | boolean = false) {
  if (typeof pageInit == 'boolean') {
    // 需要初始化页面，回到第一页
    if (pageInit)
      pageInfo.page = 1

    fetchData()
  }
  // 直接跳转到对应的页数
  if (typeof pageInit == 'number') {
    pageInfo.page = pageInit
    fetchData()
  }
}

// 暴露的接口
defineExpose<TableInstanceType<T>>({
  // 刷新
  refresh,
  // 获取数据
  getDataList: () => dataList.value as T[] || [],
})

onMounted(async () => {
  await fetchData()
})

const dividerName = props.dividerName
const helperType = props.helperType
</script>

<template>
  <div>
    <BaseTableSearchHelper
      ref="baseTableSearchHelper" :search="search" :search-extra="searchExtra"
      @search-action="params => fetchData(params, 1)"
    >
      <template v-if="slots.search" #search>
        <slot name="search" />
      </template>
      <template v-if="slots.operation" #operation>
        <slot name="operation" />
      </template>
    </BaseTableSearchHelper>
    <NDivider title-placement="left">
      {{ dividerName }}
    </NDivider>
    <div v-if="helperType === 'table'" style="overflow: auto">
      <NDataTable v-bind="$props" :data="dataList as RowDataType[]" :pagination="false" />
    </div>
    <div v-else>
      <template v-if="slots.data">
        <slot name="data" :list="dataList as T[]" />
      </template>
    </div>
    <br>
    <NSpace justify="end">
      <NPagination
        :page="pageInfo.page"
        :page-size="pageInfo.rows"
        size="medium"
        :page-sizes="pageSizes"
        :item-count="pageInfo.total"
        show-quick-jumper
        show-size-picker
        @update:page="handleChangePage"
        @update:page-size="handleChangePageSize"
      />
    </NSpace>
    <br>
  </div>
</template>
