<script setup lang="ts">
import type { MenuOption } from 'naive-ui'
import { NMenu } from 'naive-ui'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Header } from '../header'
import type { AvatarComponentContextOptions } from '~/avatar'

const props = defineProps<{
  menuOptions: MenuOption[]
  logo: string
  name?: string
  userName: string
  avatar?: string
  options?: AvatarComponentContextOptions[]
}>()

const route = useRoute()

const selectMenu = ref<string>(route.path)

watch(
  () => route.path,
  (value) => {
    selectMenu.value = value
  },
)
</script>

<template>
  <div class="h-100vh flex flex-col">
    <div border-b="~ #CCCCCC66">
      <Header :logo="props.logo" :name="props.name" :user-name="props.userName" :avatar="props.avatar" :options="props.options" />
    </div>
    <div class="flex">
      <div class="min-w-165px w-165px" border-r="~ #CCCCCC66">
        <NMenu :options="props.menuOptions" :value="selectMenu" />
      </div>
      <div class="flex-1">
        <main class="h-[calc(100vh-60px)] overflow-scroll px-4 py-5">
          <router-view v-slot="{ Component }">
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </router-view>
        </main>
      </div>
    </div>
  </div>
</template>
