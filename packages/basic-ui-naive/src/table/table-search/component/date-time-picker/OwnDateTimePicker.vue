<script setup lang="ts">
import { format } from 'date-fns'
import { NDatePicker } from 'naive-ui'
import { computed, defineExpose, onMounted, ref } from 'vue'
import type { QueryDataType } from '../../../common'
import type { BaseComponentStateProps } from '../../types'
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
const formatter = computed<string>(() => props.extra?.format || 'yyyy-MM-dd HH:mm:ss')

onMounted(() => {
  value.value = props.defaultValue
})

defineExpose({
  getParams: (): QueryDataType => ({
    [props.field]: value.value ? format(new Date(value.value), formatter.value) : undefined,
  }),
})
</script>

<template>
  <NDatePicker
    v-model:value="value"
    :format="formatter"
    type="datetime"
    clearable
    @update:value="() => emits('searchAction')"
  />
</template>
