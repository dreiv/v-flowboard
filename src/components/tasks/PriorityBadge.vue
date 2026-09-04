<script setup lang="ts">
import type { Priority } from '@/types/task'
import { PRIORITY_LABELS } from '@/types/task'

const props = defineProps<{ priority: Priority; size?: 'sm' | 'md' }>()

const colorClasses: Record<Priority, string> = {
  urgent: 'bg-urgent-bg text-urgent dark:bg-urgent/20 dark:text-red-200',
  high: 'bg-high-bg text-high dark:bg-high/20 dark:text-amber-200',
  medium: 'bg-medium-bg text-medium dark:bg-medium/20 dark:text-blue-200',
  low: 'bg-low-bg text-low dark:bg-low/20 dark:text-stone-200',
}
</script>

<template>
  <span
    class="inline-flex items-center gap-1.5 rounded-standard font-medium"
    :class="[
      colorClasses[props.priority],
      props.size === 'sm' ? 'px-1.5 py-0.5 text-[0.7rem]' : 'px-2 py-1 text-xs',
    ]"
  >
    <span class="h-1.5 w-1.5 shrink-0 rounded-full bg-current" />
    {{ PRIORITY_LABELS[props.priority] }}
  </span>
</template>
