<script setup lang="ts">
import DateRail from '@/components/journal/DateRail.vue'
import JournalEditor from '@/components/journal/JournalEditor.vue'
</script>

<template>
  <div class="flex h-full">
    <div class="py-8 pl-8">
      <DateRail />
    </div>
    <JournalEditor />
  </div>
</template>
