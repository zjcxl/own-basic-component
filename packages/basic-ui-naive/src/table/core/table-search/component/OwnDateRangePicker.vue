<script setup lang="ts">
import type { QueryType } from '@own-basic-component/config'
import type { DateRangeFieldFormatType, DateRangePicker, QueryDataType } from '@own-basic-component/ui-naive'
import { computed, defineExpose, onMounted, ref } from 'vue'
import { NDatePicker } from 'naive-ui'

import { format } from 'date-fns'

interface StateProps {
  defaultValue?: QueryType
  index: number
  placeholder?: string
  field: string
  options?: DateRangePicker
}

const props = withDefaults(defineProps<StateProps>(), {
  placeholder: '',
})

const value = ref<[number, number] | null>()

/**
 * 格式化的内容
 */
const formatter = computed<string>(() => props.options?.format || 'yyyy-MM-dd')

const defaultDateTimeRangeFieldFormat: DateRangeFieldFormatType = [
  (field: string) => `${field}Start`,
  (field: string) => `${field}End`,
]

/**
 * 字段格式化数组
 */
const fieldFormatArray = computed<DateRangeFieldFormatType>(() => props.options?.fieldFormat || defaultDateTimeRangeFieldFormat)

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
    :default-value="props.defaultValue"
    :format="formatter"
    type="daterange"
    clearable
  />
</template>
