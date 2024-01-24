<script setup lang="ts">
import { NSelect } from 'naive-ui'
import type { SelectMixedOption } from 'naive-ui/es/select/src/interface'
import { defineExpose, onMounted, ref } from 'vue'
import type { QueryDataType } from '../../../common'
import type { BaseComponentStateProps } from '../../types'

const props = withDefaults(defineProps<BaseComponentStateProps<string | number | undefined, Array<SelectMixedOption>>>(), {
  placeholder: '',
})

/**
 * 具体的值
 */
const value = ref<string | number | undefined>()

onMounted(() => {
  value.value = props.defaultValue
})

defineExpose({
  getParams: (): QueryDataType => ({ [props.field]: value.value }),
})
</script>

<template>
  <NSelect
    :key="props.index"
    v-model:value="value"
    clearable
    :placeholder="props.placeholder"
    :options="props.options"
  />
</template>
