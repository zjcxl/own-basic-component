<script setup lang="ts">
import hljs from 'highlight.js/lib/core'
import json from 'highlight.js/lib/languages/json'
import { dateZhCN, NConfigProvider, zhCN } from 'naive-ui'

hljs.registerLanguage('json', json)
</script>

<template>
  <NConfigProvider :hljs="hljs" :locale="zhCN" :date-locale="dateZhCN">
    <div class="p4">
      <router-view />
    </div>
  </NConfigProvider>
</template>
