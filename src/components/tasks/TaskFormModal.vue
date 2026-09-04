<script setup lang="ts">
import { reactive, watch } from 'vue'
import ModalDialog from '@/components/layout/ModalDialog.vue'
import type { Lane, Priority, Task } from '@/types/task'

const props = defineProps<{
  lanes: Lane[]
  editingTask?: Task | null
  defaultLaneId?: string
}>()

const emit = defineEmits<{
  close: []
  submit: [
    payload: { title: string; description?: string; priority: Priority; laneId: string },
  ]
}>()

const form = reactive({
  title: '',
  description: '',
  priority: 'medium' as Priority,
  laneId: props.defaultLaneId ?? props.lanes[0]?.id ?? '',
})

watch(
  () => props.editingTask,
  (task) => {
    if (task) {
      form.title = task.title
      form.description = task.description ?? ''
      form.priority = task.priority
      form.laneId = task.laneId
    }
  },
  { immediate: true },
)

function handleSubmit() {
  if (!form.title.trim()) return
  emit('submit', {
    title: form.title,
    description: form.description || undefined,
    priority: form.priority,
    laneId: form.laneId,
  })
}
</script>

<template>
  <ModalDialog :title="editingTask ? 'Edit task' : 'New task'" @close="emit('close')">
    <form class="flex flex-col gap-4" @submit.prevent="handleSubmit">
      <div>
        <label for="task-title" class="mb-1 block text-xs font-medium text-ink-soft dark:text-ink-dark-text-soft">
          Title
        </label>
        <input
          id="task-title"
          v-model="form.title"
          type="text"
          required
          autofocus
          placeholder="What needs doing?"
          class="w-full rounded-standard border border-mist-light bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-pine dark:border-ink-dark-border dark:bg-ink-dark-surface-2 dark:text-ink-dark-text"
        />
      </div>

      <div>
        <label for="task-desc" class="mb-1 block text-xs font-medium text-ink-soft dark:text-ink-dark-text-soft">
          Description <span class="text-mist">(optional)</span>
        </label>
        <textarea
          id="task-desc"
          v-model="form.description"
          rows="3"
          placeholder="Add more detail..."
          class="w-full resize-none rounded-standard border border-mist-light bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-pine dark:border-ink-dark-border dark:bg-ink-dark-surface-2 dark:text-ink-dark-text"
        />
      </div>

      <div class="grid grid-cols-2 gap-3">
        <div>
          <label for="task-priority" class="mb-1 block text-xs font-medium text-ink-soft dark:text-ink-dark-text-soft">
            Priority
          </label>
          <select
            id="task-priority"
            v-model="form.priority"
            class="w-full rounded-standard border border-mist-light bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-pine dark:border-ink-dark-border dark:bg-ink-dark-surface-2 dark:text-ink-dark-text"
          >
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <div>
          <label for="task-lane" class="mb-1 block text-xs font-medium text-ink-soft dark:text-ink-dark-text-soft">
            Lane
          </label>
          <select
            id="task-lane"
            v-model="form.laneId"
            class="w-full rounded-standard border border-mist-light bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-pine dark:border-ink-dark-border dark:bg-ink-dark-surface-2 dark:text-ink-dark-text"
          >
            <option v-for="lane in lanes" :key="lane.id" :value="lane.id">{{ lane.name }}</option>
          </select>
        </div>
      </div>

      <div class="mt-2 flex justify-end gap-2">
        <button
          type="button"
          class="rounded-standard px-3 py-2 text-sm text-ink-soft hover:bg-paper-dim dark:text-ink-dark-text-soft dark:hover:bg-ink-dark-surface-2"
          @click="emit('close')"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="rounded-standard bg-pine px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-pine-dark"
        >
          {{ editingTask ? 'Save changes' : 'Add task' }}
        </button>
      </div>
    </form>
  </ModalDialog>
</template>
