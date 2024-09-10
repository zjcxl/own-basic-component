<script setup lang="ts" generic="T = File">
import { ref } from 'vue'
import { resolveFileList, resolveFileListToArray } from '../composables'
import type { FileResolveMethod } from '../composables'

/**
 * 定义传入参数
 */
const props = withDefaults(defineProps<{
  /**
   * 显示的文字
   */
  text?: string
  /**
   * 图片时间
   */
  resolveFileMethod?: FileResolveMethod<T>
  /**
   * 是否支持多选
   */
  multiple?: boolean
  /**
   * 接受的文件类型
   */
  accept?: string
}>(), {
  text: '选择文件',
  multiple: false,
})

/**
 * 定义事件
 */
const emits = defineEmits<{
  change: [T[]]
}>()

/**
 * 插槽内容
 */
const slots = defineSlots<{
  default?: any
}>()

/**
 * 文件选择器
 */
const fileRef = ref<HTMLInputElement>()

/**
 * 选择文件事件
 */
function handleSelectFile() {
  fileRef.value?.click()
}

/**
 * 获取文件事件
 * @param e 事件
 */
async function handleChangeSelectFile(e: Event) {
  const selectFileList = (e.target as HTMLInputElement).files
  if (selectFileList) {
    if (props.resolveFileMethod) {
      resolveFileList(selectFileList, props.resolveFileMethod).then((result) => {
        emits('change', result)
      })
    }
    else {
      emits('change', resolveFileListToArray(selectFileList) as T[])
    }
    fileRef.value!.value = ''
  }
}
</script>

<template>
  <div>
    <div v-if="slots.default" @click="handleSelectFile">
      <slot />
    </div>
    <input
      ref="fileRef"
      :multiple="props.multiple"
      :accept="props.accept"
      hidden
      type="file"
      @change="handleChangeSelectFile"
    >
  </div>
</template>
