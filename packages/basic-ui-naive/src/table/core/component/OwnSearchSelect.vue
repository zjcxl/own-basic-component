<script setup lang="ts">
import type { SelectMixedOption } from 'naive-ui/es/select/src/interface'
import { NSelect } from 'naive-ui'
import { defineModel } from 'vue'

interface StateProps {
  index: number
  placeholder?: string
  options?: Array<SelectMixedOption>
}

const props = withDefaults(defineProps<StateProps>(), {
  placeholder: '',
})

const value = defineModel<string>()
console.log(value)
</script>

<template>
  <NSelect
    :key="props.index"
    v-model:value="value"
    :placeholder="props.placeholder"
    :options="props.options"
  />
</template>

<style scoped>

</style>
