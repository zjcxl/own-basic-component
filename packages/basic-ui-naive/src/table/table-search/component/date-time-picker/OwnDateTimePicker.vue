<script setup lang="ts">
import { NDatePicker } from 'naive-ui'
import { computed, defineExpose, onMounted, ref } from 'vue'
import type { QueryDataType } from '../../../common'
import type { BaseComponentStateProps } from '../../types'
import { getDateTimePickerParams, getFinalDateTimePickerFormatter } from './utils'
import type { DateTimePicker } from './types'

const props = withDefaults(defineProps<BaseComponentStateProps<number, DateTimePicker>>(), {
  placeholder: '',
})

const emits = defineEmits<{
  searchAction: []
}>()

/**
 * 具体的时间值（时间戳）
 */
const value = ref<number | undefined>()

/**
 * 格式化的内容
 */
const formatter = computed<string>(() => getFinalDateTimePickerFormatter(props.extra?.format))

onMounted(() => {
  value.value = props.defaultValue
})

defineExpose({
  getParams: (): QueryDataType => getDateTimePickerParams(formatter.value, props.field, value.value),
})
</script>

<template>
  <NDatePicker
    v-model:value="value"
    :format="formatter"
    type="datetime"
    clearable
    :disabled="props.disabled"
    @update:value="() => emits('searchAction')"
  />
</template>
