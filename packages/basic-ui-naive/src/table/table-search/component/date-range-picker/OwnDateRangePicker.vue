<script setup lang="ts">
import { format } from 'date-fns'
import { NDatePicker } from 'naive-ui'
import { computed, defineExpose, onMounted, ref } from 'vue'
import { sendAe } from '@own-basic-component/buried'
import type { QueryDataType } from '../../../common'
import type { BaseComponentStateProps } from '../../types'
import type { DateRangeFieldFormatType, DateRangePicker, DateRangeShortcutsType } from './types'

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
 * 快捷操作
 */
const finalShortcuts = computed<DateRangeShortcutsType>(() => {
  if (props.extra?.shortcuts && props.extra?.shortcutsSetting?.second) {
    // 元组第二位的值减second
    const t = props.extra?.shortcutsSetting?.second
    const resultMap: DateRangeShortcutsType = {}
    Object.keys(props.extra?.shortcuts).forEach((key) => {
      const [time1, time2] = props.extra?.shortcuts?.[key] || [0, 0]
      resultMap[key] = [time1, time2 - t]
    })
    return resultMap
  }
  return props.extra?.shortcuts || {}
})

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

function handleChangeValue() {
  sendAe({
    actionName: 'search',
    actionType: 'date-range-picker',
    actionValue: value.value,
  })
  emits('searchAction')
}

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
    :shortcuts="finalShortcuts"
    @update:value="handleChangeValue"
  />
</template>
