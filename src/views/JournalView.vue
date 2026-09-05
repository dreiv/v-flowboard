<script setup lang="ts">
import DateRail from '@/components/journal/DateRail.vue'
import JournalEditor from '@/components/journal/JournalEditor.vue'
</script>

<template>
  <div class="flex h-full flex-col md:flex-row">
    <div class="py-4 pl-4 md:py-8 md:pl-8">
      <DateRail />
    </div>
    <JournalEditor />
  </div>
</template>
