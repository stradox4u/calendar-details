<script setup lang="ts">
import { useUserStore } from './stores/userStore';

const userStore = useUserStore();

onMounted(() => {
  nextTick(() => {
    userStore.handleClientLoad();
  })
})
</script>

<template>
  <NuxtLayout>
    <nuxt-page></nuxt-page>
  </NuxtLayout>
</template>
