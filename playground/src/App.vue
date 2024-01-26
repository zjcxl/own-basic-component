<script setup lang="ts">
import { NConfigProvider, dateZhCN, zhCN } from 'naive-ui'
import hljs from 'highlight.js/lib/core'
import json from 'highlight.js/lib/languages/json'

hljs.registerLanguage('json', json)
</script>

<template>
  <NConfigProvider :hljs="hljs" :locale="zhCN" :date-locale="dateZhCN">
    <div class="p4">
      <router-view />
    </div>
  </NConfigProvider>
</template>
