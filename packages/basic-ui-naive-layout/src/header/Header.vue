<script setup lang="ts">
import { Avatar } from '../avatar'
import type { AvatarComponentContextOptions } from '~/avatar'

defineProps<{
  logo: string
  name?: string
  userName: string
  avatar?: string
  options?: AvatarComponentContextOptions[]
}>()
</script>

<template>
  <div class="h-60px flex justify-between px-20px py-10px shadow-white">
    <div class="h-full w-200px flex select-none items-center justify-start gap-3">
      <img v-if="logo" class="h-full border-rd-2" :src="logo" alt="">
      <span v-if="name" class="text-2em font-bold">{{ name }}</span>
    </div>
    <div class="inline-block w-sm flex-1">
      <slot />
    </div>
    <Avatar class="w-300px flex justify-end" :user-name="userName" :avatar="avatar" :options="options" />
  </div>
</template>
