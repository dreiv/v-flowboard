<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { Lane, Task } from '@/types/task'
import PriorityBadge from '@/components/tasks/PriorityBadge.vue'
import BaseSelect from '@/components/ui/BaseSelect.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const props = defineProps<{
  task: Task
  lanes: Lane[]
  draggable?: boolean
  variant?: 'list' | 'card'
}>()

const emit = defineEmits<{
  edit: [task: Task]
  delete: [id: string]
  changeLane: [id: string, laneId: string]
}>()

const { t } = useI18n()
</script>

<template>
  <article
    class="group flex gap-2 rounded-standard border border-mist-light bg-surface p-3 transition-shadow dark:border-ink-dark-border dark:bg-ink-dark-surface"
    :class="variant === 'list' ? 'items-start' : 'flex-col'" :aria-label="task.title">
    <span v-if="draggable"
      class="drag-handle mt-0.5 shrink-0 cursor-grab select-none text-mist-light dark:text-ink-dark-border"
      aria-hidden="true">
      ⠿
    </span>

    <div class="min-w-0 flex-1">
      <div class="flex items-start justify-between gap-2">
        <p class="text-sm font-medium text-ink dark:text-ink-dark-text">{{ task.title }}</p>
        <PriorityBadge :priority="task.priority" size="sm" />
      </div>
      <p v-if="task.description" class="mt-1 line-clamp-2 text-xs text-ink-soft dark:text-ink-dark-text-soft">
        {{ task.description }}
      </p>

      <div
        class="mt-2 flex items-center gap-3 transition-opacity md:opacity-0 md:group-hover:opacity-100 md:focus-within:opacity-100">
        <BaseButton variant="ghost" size="sm" class="px-0! text-pine hover:underline dark:text-pine-light"
          @click="emit('edit', task)">
          {{ t('tasks.card.edit') }}
        </BaseButton>
        <BaseSelect class="w-auto!" :model-value="task.laneId" :aria-label="t('tasks.card.changeLane')"
          :options="lanes.map((l) => ({ value: l.id, label: l.name }))"
          @update:model-value="(laneId) => emit('changeLane', task.id, laneId)" />
        <BaseButton variant="ghost" size="sm" class="px-0! text-mist hover:text-urgent"
          @click="emit('delete', task.id)">
          {{ t('tasks.card.delete') }}
        </BaseButton>
      </div>
    </div>
  </article>
</template>
