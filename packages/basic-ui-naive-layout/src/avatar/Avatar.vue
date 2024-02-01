<script setup lang="ts">
import { computed, withDefaults } from 'vue'
import { useNow } from '@vueuse/core'
import { format } from 'date-fns'
import { NDivider, NDropdown } from 'naive-ui'
import type { AvatarComponentContextOptions } from '~/avatar/types'

const props = withDefaults(defineProps<{
  userName: string
  avatar?: string
  options?: AvatarComponentContextOptions[]
}>(), {
  avatar: '',
  options: () => [],
})

/**
 * 当前的时间
 */
const now = useNow()

/**
 * 显示的用户名称信息
 */
const showUserName = computed<string>(() => {
  const name = props.userName
  return name.length > 6 ? `${name.substring(0, 5)}...` : name
})

/**
 * 显示的时间
 */
const showTime = computed<string>(() => format(now.value, 'yyyy-MM-dd HH:mm:ss'))

/**
 * 显示的选项名称
 */
const showOptions = computed<AvatarComponentContextOptions[]>(() => props.options)

/**
 * 选择信息触发事件
 * @param key 选择的key
 */
function handleSelect(key: string | number) {
  showOptions.value.find(item => item.key === key)?.action?.()
}
</script>

<template>
  <div>
    s
    <div h-full flex cursor-default items-center justify-center gap-3>
      <div flex flex-col items-end justify-end>
        <div font-mono>
          {{ showTime }}
        </div>
        <div>
          <span>欢迎访问，</span>
          <span font-bold class="rainbow-text">{{ showUserName }}</span>
        </div>
      </div>
      <template v-if="props.avatar">
        <NDivider vertical />
        <img
          alt=""
          class="h-full border-rd-[50%]"
          :src="props.avatar"
        >
      </template>
      <template v-if="showOptions.length > 0">
        <NDropdown trigger="hover" :options="showOptions" @select="handleSelect">
          <i class="i-carbon-caret-down hover:i-carbon-caret-up inline-block cursor-pointer transition" />
        </NDropdown>
      </template>
    </div>
  </div>
</template>
