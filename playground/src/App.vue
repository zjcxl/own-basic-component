<script setup lang="ts">
const router = useRouter()
router.push('/table')
</script>

<template>
  <div m2 p2 border-rd border="2 red solid">
    <router-view />
  </div>
</template>
