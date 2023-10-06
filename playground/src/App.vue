<script setup lang="ts">
import { NConfigProvider, dateZhCN, zhCN } from 'naive-ui'
</script>

<template>
  <NConfigProvider :locale="zhCN" :date-locale="dateZhCN">
    <div m3 p4 border-rd-4 border="~ gray-300 solid" shadow>
      <router-view />
    </div>
  </NConfigProvider>
</template>
