<script setup lang="ts">
import { NDatePicker } from 'naive-ui'
import { computed, defineExpose, onMounted, ref } from 'vue'
import type { QueryDataType } from '../../../common'
import type { BaseComponentStateProps } from '../../types'
import type { DateTimeRangeFieldFormatType, DateTimeRangePicker } from './types'
import {
  getDateTimeRangePickerParams,
  getFinalDateTimeRangePickerFieldFormatArray,
  getFinalDateTimeRangePickerFormatter,
} from './utils'

const props = withDefaults(defineProps<BaseComponentStateProps<[number, number], DateTimeRangePicker>>(), {
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
const formatter = computed<string>(() => getFinalDateTimeRangePickerFormatter(props.extra?.format))

/**
 * 字段格式化数组
 */
const fieldFormatArray = computed<DateTimeRangeFieldFormatType>(() => getFinalDateTimeRangePickerFieldFormatArray(props.extra?.fieldFormat))

onMounted(() => {
  value.value = props.defaultValue
})

defineExpose({
  getParams: (): QueryDataType => getDateTimeRangePickerParams(formatter.value, fieldFormatArray.value, props.field, value.value),
})
</script>

<template>
  <NDatePicker
    v-model:value="value"
    :format="formatter"
    type="datetimerange"
    clearable
    :disabled="props.disabled"
    @update:value="() => emits('searchAction')"
  />
</template>
