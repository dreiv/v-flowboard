<script setup lang="ts">
import { ref } from 'vue'
import { useTaskStore } from '@/stores/task'
import KanbanBoard from '@/components/tasks/KanbanBoard.vue'
import TaskListView from '@/components/tasks/TaskListView.vue'
import TaskFormModal from '@/components/tasks/TaskFormModal.vue'
import type { Priority, Task } from '@/types/task'

const store = useTaskStore()

const isModalOpen = ref(false)
const editingTask = ref<Task | null>(null)
const defaultLaneId = ref<string | undefined>(undefined)

function openCreateModal(laneId?: string) {
  editingTask.value = null
  defaultLaneId.value = laneId
  isModalOpen.value = true
}

function openEditModal(task: Task) {
  editingTask.value = task
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value = false
  editingTask.value = null
}

function handleSubmit(payload: {
  title: string
  description?: string
  priority: Priority
  laneId: string
}) {
  if (editingTask.value) {
    store.updateTask(editingTask.value.id, payload)
  } else {
    store.createTask(payload)
  }
  closeModal()
}
</script>

<template>
  <div class="mx-auto max-w-6xl px-8 py-8">
    <header class="mb-6 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 class="font-display text-3xl text-ink dark:text-ink-dark-text">Tasks</h1>
        <p class="mt-1 text-sm text-ink-soft dark:text-ink-dark-text-soft">
          {{ store.tasks.length }} task{{ store.tasks.length === 1 ? '' : 's' }} across
          {{ store.lanes.length }} lane{{ store.lanes.length === 1 ? '' : 's' }}
        </p>
      </div>
      <button
        type="button"
        class="rounded-standard bg-pine px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-pine-dark"
        @click="openCreateModal()"
      >
        + New task
      </button>
    </header>

    <div class="mb-6 flex flex-wrap items-center gap-4">
      <div class="inline-flex rounded-standard border border-mist-light p-0.5 dark:border-ink-dark-border" role="group" aria-label="Task view">
        <button
          type="button"
          class="rounded-[0.25rem] px-3 py-1.5 text-sm font-medium transition-colors"
          :class="store.viewMode === 'list' ? 'bg-pine text-white' : 'text-ink-soft dark:text-ink-dark-text-soft'"
          @click="store.setViewMode('list')"
        >
          List
        </button>
        <button
          type="button"
          class="rounded-[0.25rem] px-3 py-1.5 text-sm font-medium transition-colors"
          :class="store.viewMode === 'kanban' ? 'bg-pine text-white' : 'text-ink-soft dark:text-ink-dark-text-soft'"
          @click="store.setViewMode('kanban')"
        >
          Kanban
        </button>
      </div>

      <div class="inline-flex rounded-standard border border-mist-light p-0.5 dark:border-ink-dark-border" role="group" aria-label="Sort mode">
        <button
          type="button"
          class="rounded-[0.25rem] px-3 py-1.5 text-sm font-medium transition-colors"
          :class="store.sortMode === 'custom' ? 'bg-pine text-white' : 'text-ink-soft dark:text-ink-dark-text-soft'"
          @click="store.setSortMode('custom')"
        >
          Custom order
        </button>
        <button
          type="button"
          class="rounded-[0.25rem] px-3 py-1.5 text-sm font-medium transition-colors"
          :class="store.sortMode === 'priority' ? 'bg-pine text-white' : 'text-ink-soft dark:text-ink-dark-text-soft'"
          @click="store.setSortMode('priority')"
        >
          Priority sort
        </button>
      </div>

      <p v-if="store.sortMode === 'priority'" class="text-xs text-mist dark:text-ink-dark-text-soft">
        Drag-and-drop is off while sorting by priority.
      </p>
    </div>

    <KanbanBoard
      v-if="store.viewMode === 'kanban'"
      @edit-task="openEditModal"
      @add-task="openCreateModal"
    />
    <TaskListView v-else @edit-task="openEditModal" />

    <TaskFormModal
      v-if="isModalOpen"
      :lanes="store.lanes"
      :editing-task="editingTask"
      :default-lane-id="defaultLaneId"
      @close="closeModal"
      @submit="handleSubmit"
    />
  </div>
</template>
