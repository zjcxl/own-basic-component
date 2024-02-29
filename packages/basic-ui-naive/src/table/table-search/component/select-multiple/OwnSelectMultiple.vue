<script setup lang="ts">
import { NSelect } from 'naive-ui'
import { computed, defineExpose, onMounted, ref } from 'vue'
import { sendAe } from '@own-basic-component/buried'
import type { SelectAdvancedOption } from '../select/types'
import type { QueryDataType } from '../../../common'
import type { BaseComponentStateProps } from '../../types'

const props = withDefaults(defineProps<BaseComponentStateProps<
  Array<string | number | undefined>,
  SelectAdvancedOption
>>(), {
  placeholder: '',
})

const emits = defineEmits<{
  searchAction: []
}>()

/**
 * 具体的值
 */
const value = ref<Array<string | number | undefined>>()

/**
 * 是否允许动态添加
 */
const allowDynamicAdd = computed<boolean>(() => props.extra?.allowDynamicAdd ?? false)

/**
 * 是否显示tag
 */
const tag = computed<boolean>(() => allowDynamicAdd.value || (props.extra?.tag ?? false))
/**
 * 是否显示过滤
 */
const filterable = computed<boolean>(() => allowDynamicAdd.value || (props.extra?.filterable ?? false))

onMounted(() => {
  value.value = props.defaultValue
})

function handleChangeValue() {
  sendAe({
    actionName: 'search',
    actionType: 'select-multiple',
    actionValue: value.value,
  })
  emits('searchAction')
}

defineExpose({
  getParams: (): QueryDataType => ({ [props.field]: value.value }),
})
</script>

<template>
  <NSelect
    :key="props.index"
    v-model:value="value"
    clearable
    multiple
    :disabled="props.disabled"
    :tag="tag"
    :filterable="filterable"
    :placeholder="props.placeholder"
    :options="props.extra?.options"
    @update:value="handleChangeValue"
  />
</template>
