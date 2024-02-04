<script setup lang="ts">
import { format } from 'date-fns'
import { NDatePicker } from 'naive-ui'
import { computed, defineExpose, onMounted, ref } from 'vue'
import type { QueryDataType } from '../../../common'
import type { BaseComponentStateProps } from '../../types'
import type { DateRangeFieldFormatType, DateRangePicker } from './types'

const props = withDefaults(defineProps<BaseComponentStateProps<[number, number], DateRangePicker>>(), {
  placeholder: '',
})

const emits = defineEmits<{
  searchAction: []
}>()

/**
 * 具体的时间值（时间戳）
 */
const value = ref<[number, number] | undefined>()

/**
 * 格式化的内容
 */
const formatter = computed<string>(() => props.extra?.format || 'yyyy-MM-dd')

/**
 * 默认的字段格式化数组
 */
const defaultDateTimeRangeFieldFormat: DateRangeFieldFormatType = [
  (field: string) => `${field}Start`,
  (field: string) => `${field}End`,
]

/**
 * 字段格式化数组
 */
const fieldFormatArray = computed<DateRangeFieldFormatType>(() => props.extra?.fieldFormat || defaultDateTimeRangeFieldFormat)

onMounted(() => {
  value.value = props.defaultValue
})

defineExpose({
  getParams: (): QueryDataType => {
    const result = {} as QueryDataType
    fieldFormatArray.value.forEach((method, index) => {
      result[method(props.field)] = value.value?.[index] ? format(new Date(value.value[index]), formatter.value) : undefined
    })
    return result
  },
})
</script>

<template>
  <NDatePicker
    v-model:value="value"
    :format="formatter"
    type="daterange"
    clearable
    :disabled="props.disabled"
    @update:value="() => emits('searchAction')"
  />
</template>
