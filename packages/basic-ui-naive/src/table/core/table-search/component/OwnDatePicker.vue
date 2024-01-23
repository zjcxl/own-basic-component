<script setup lang="ts">
import type { QueryType } from '@own-basic-component/config'
import type { QueryDataType } from '@own-basic-component/ui-naive'
import { defineExpose, onMounted, ref } from 'vue'

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
  <n-date-picker
    v-model:value="value"
    :default-value="props.defaultValue"
    type="datetime"
    clearable
  />
</template>
