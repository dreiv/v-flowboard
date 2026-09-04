<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { Priority } from '@/types/task'
import Badge from '@/components/ui/Badge.vue'

const props = defineProps<{ priority: Priority; size?: 'sm' | 'md' }>()
const { t } = useI18n()

const colorClasses: Record<Priority, string> = {
  urgent: 'bg-urgent-bg text-urgent-text',
  high: 'bg-high-bg text-high-text',
  medium: 'bg-medium-bg text-medium-text',
  low: 'bg-low-bg text-low-text',
}
</script>

<template>
  <Badge :color-class="colorClasses[props.priority]" :size="size">
    {{ t(`tasks.priority.${props.priority}`) }}
  </Badge>
</template>
