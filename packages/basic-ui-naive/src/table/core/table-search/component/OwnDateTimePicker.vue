<script setup lang="ts">
import type { QueryType } from '@own-basic-component/config'
import type { DatePicker, QueryDataType } from '@own-basic-component/ui-naive'
import { computed, defineExpose, onMounted, ref } from 'vue'
import { NDatePicker } from 'naive-ui'

import { format } from 'date-fns'

interface StateProps {
  defaultValue?: QueryType
  index: number
  placeholder?: string
  field?: string
  options?: DatePicker
}

const props = withDefaults(defineProps<StateProps>(), {
  placeholder: '',
})

const value = ref<number | null>()

/**
 * 格式化的内容
 */
const formatter = computed<string>(() => props.options?.format || 'yyyy-MM-dd HH:mm:ss')

onMounted(() => {
  value.value = props.defaultValue
})

defineExpose({
  getParams: (): QueryDataType => props.field
    ? {
        [props.field]: value.value ? format(new Date(value.value), formatter.value) : undefined,
      }
    : {},
})
</script>

<template>
  <NDatePicker
    v-model:value="value"
    :default-value="props.defaultValue"
    :format="formatter"
    type="datetime"
    clearable
  />
</template>
