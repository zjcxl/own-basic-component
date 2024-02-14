<script setup lang="ts">
import { NDatePicker } from 'naive-ui'
import { computed, defineExpose, onMounted, ref } from 'vue'
import type { QueryDataType } from '../../../common'
import type { BaseComponentStateProps } from '../../types'
import { getDateRangePickerParams, getFinalDateRangePickerFieldFormatArray, getFinalDateRangePickerFormatter } from './utils'
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
const formatter = computed<string>(() => getFinalDateRangePickerFormatter(props.extra?.format))

/**
 * 字段格式化数组
 */
const fieldFormatArray = computed<DateRangeFieldFormatType>(() => getFinalDateRangePickerFieldFormatArray(props.extra?.fieldFormat))

onMounted(() => {
  value.value = props.defaultValue
})

defineExpose({
  getParams: (): QueryDataType => getDateRangePickerParams(formatter.value, fieldFormatArray.value, props.field, value.value),
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
