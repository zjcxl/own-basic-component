<script setup lang="ts">
import { format } from 'date-fns'
import { NDatePicker } from 'naive-ui'
import { computed, defineExpose, onMounted, ref } from 'vue'
import { sendAe } from '@own-basic-component/buried'
import type { QueryDataType } from '../../../common'
import type { BaseComponentStateProps } from '../../types'
import type { DatePicker } from './types'

const props = withDefaults(defineProps<BaseComponentStateProps<number, DatePicker>>(), {
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
const formatter = computed<string>(() => props.extra?.format || 'yyyy-MM-dd')

onMounted(() => {
  value.value = props.defaultValue
})

function handleChangeValue() {
  sendAe({
    actionName: 'search',
    actionType: 'date-picker',
    actionValue: value.value,
  })
  emits('searchAction')
}

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
    type="date"
    clearable
    :disabled="props.disabled"
    @update:value="handleChangeValue"
  />
</template>
