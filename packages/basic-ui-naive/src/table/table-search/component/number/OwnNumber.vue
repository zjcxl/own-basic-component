<script setup lang="ts">
import { NInputNumber } from 'naive-ui'
import { defineExpose, onMounted, ref } from 'vue'
import type { QueryDataType } from '../../../common'
import type { BaseComponentStateProps } from '../../types'
import type { NumberAdvancedExtra } from './types'

const props = withDefaults(defineProps<BaseComponentStateProps<number | undefined, NumberAdvancedExtra>>(), {
  placeholder: '',
})

const emits = defineEmits<{
  searchAction: []
}>()

/**
 * 具体的值
 */
const value = ref<number | undefined>()

onMounted(() => {
  value.value = props.defaultValue
})

defineExpose({
  getParams: (): QueryDataType => ({ [props.field]: value.value !== 0 ? (value.value ? value.value : undefined) : 0 }),
})
</script>

<template>
  <NInputNumber
    :key="props.index"
    v-model:value="value"
    :max="props.extra?.max"
    :min="props.extra?.min"
    :step="props.extra?.step || 1"
    clearable
    :disabled="props.disabled"
    :placeholder="props.placeholder"
    @update:value="() => emits('searchAction')"
  />
</template>
