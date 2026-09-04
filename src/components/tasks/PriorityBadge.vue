<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { Priority } from '@/types/task'
import Badge from '@/components/ui/Badge.vue'

const props = defineProps<{ priority: Priority; size?: 'sm' | 'md' }>()
const { t } = useI18n()

const colorClasses: Record<Priority, string> = {
  urgent: 'bg-urgent-bg text-urgent dark:bg-urgent/20 dark:text-red-200',
  high: 'bg-high-bg text-high dark:bg-high/20 dark:text-amber-200',
  medium: 'bg-medium-bg text-medium dark:bg-medium/20 dark:text-blue-200',
  low: 'bg-low-bg text-low dark:bg-low/20 dark:text-stone-200',
}
</script>

<template>
  <Badge :color-class="colorClasses[props.priority]" :size="size">
    {{ t(`tasks.priority.${props.priority}`) }}
  </Badge>
</template>
