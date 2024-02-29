<script setup lang="ts">
import { NInput } from 'naive-ui'
import { defineExpose, onMounted, ref } from 'vue'
import { sendAe } from '@own-basic-component/buried'
import type { QueryDataType } from '../../../common'
import type { BaseComponentStateProps } from '../../types'

const props = withDefaults(defineProps<BaseComponentStateProps<string>>(), {
  placeholder: '',
})

const emits = defineEmits<{
  searchAction: []
}>()

/**
 * 具体的值
 */
const value = ref<string | undefined>()

onMounted(() => {
  value.value = props.defaultValue
})

function handleChangeValue() {
  sendAe({
    actionName: 'search',
    actionType: 'input',
    actionValue: value.value,
  })
  emits('searchAction')
}

defineExpose({
  getParams: (): QueryDataType => ({ [props.field]: value.value }),
})
</script>

<template>
  <NInput
    :key="props.index"
    v-model:value="value"
    clearable
    :disabled="props.disabled"
    :placeholder="props.placeholder"
    @keydown.enter="handleChangeValue"
  />
</template>
