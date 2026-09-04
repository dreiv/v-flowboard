<script setup lang="ts">
import type { Lane, Task } from '@/types/task'
import PriorityBadge from '@/components/tasks/PriorityBadge.vue'

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
</script>

<template>
  <div
    class="group flex gap-2 rounded-standard border border-mist-light bg-surface p-3 transition-shadow dark:border-ink-dark-border dark:bg-ink-dark-surface"
    :class="variant === 'list' ? 'items-start' : 'flex-col'"
  >
    <span
      v-if="draggable"
      class="drag-handle mt-0.5 shrink-0 cursor-grab select-none text-mist-light dark:text-ink-dark-border"
      aria-hidden="true"
    >
      ⠿
    </span>

    <div class="min-w-0 flex-1">
      <div class="flex items-start justify-between gap-2">
        <p class="text-sm font-medium text-ink dark:text-ink-dark-text">{{ task.title }}</p>
        <PriorityBadge :priority="task.priority" size="sm" />
      </div>
      <p
        v-if="task.description"
        class="mt-1 line-clamp-2 text-xs text-ink-soft dark:text-ink-dark-text-soft"
      >
        {{ task.description }}
      </p>

      <div class="mt-2 flex items-center gap-3 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
        <button
          type="button"
          class="text-xs font-medium text-pine hover:underline dark:text-pine-light"
          @click="emit('edit', task)"
        >
          Edit
        </button>
        <select
          class="rounded-standard border border-mist-light bg-paper px-1.5 py-0.5 text-xs text-ink-soft dark:border-ink-dark-border dark:bg-ink-dark-surface-2 dark:text-ink-dark-text-soft"
          :value="task.laneId"
          aria-label="Change lane"
          @change="emit('changeLane', task.id, ($event.target as HTMLSelectElement).value)"
        >
          <option v-for="lane in lanes" :key="lane.id" :value="lane.id">{{ lane.name }}</option>
        </select>
        <button
          type="button"
          class="text-xs font-medium text-mist hover:text-urgent"
          @click="emit('delete', task.id)"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>
