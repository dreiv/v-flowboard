<script setup lang="ts">
import AppSidebar from '@/components/layout/AppSidebar.vue'
</script>

<template>
  <div class="flex h-screen overflow-hidden">
    <AppSidebar />
    <main class="flex-1 overflow-y-auto">
      <RouterView />
    </main>
  </div>
</template>
