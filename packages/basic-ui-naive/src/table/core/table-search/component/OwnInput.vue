<script setup lang="ts">
import type { QueryType } from '@own-basic-component/config'
import { NInput } from 'naive-ui'
import { defineExpose, onMounted, ref } from 'vue'
import type { QueryDataType } from '../../../common'

interface StateProps {
  defaultValue?: QueryType
  index: number
  placeholder?: string
  field?: string
}

const props = withDefaults(defineProps<StateProps>(), {
  placeholder: '',
})

const value = ref<QueryType>()

onMounted(() => {
  value.value = props.defaultValue
})

defineExpose({
  getParams: (): QueryDataType => props.field ? { [props.field]: value.value } : {},
})
</script>

<template>
  <NInput
    :key="props.index"
    v-model:value="value"
    :placeholder="props.placeholder"
  />
</template>
