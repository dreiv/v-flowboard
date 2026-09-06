<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { List, KanbanSquare } from '@lucide/vue'
import { useTaskStore } from '@/stores/task'
import KanbanBoard from '@/components/tasks/KanbanBoard.vue'
import TaskListView from '@/components/tasks/TaskListView.vue'
import TaskFormModal from '@/components/tasks/TaskFormModal.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import type { Task } from '@/types/task'
import type { TaskFormPayload } from '@/composables/useTaskFormModel'

const store = useTaskStore()
const { t } = useI18n()

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

function handleSubmit(payload: TaskFormPayload) {
  if (editingTask.value) {
    store.updateTask(editingTask.value.id, payload)
  } else {
    store.createTask(payload)
  }
  closeModal()
}
</script>

<template>
  <div class="mx-auto flex min-h-full flex-col px-4 py-4 md:px-8 md:py-8"
    :class="store.viewMode === 'kanban' ? 'max-w-none' : 'max-w-6xl'">
    <header class="mb-6 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 class="font-display text-3xl text-ink">{{ t('tasks.page.title') }}</h1>
        <p class="mt-1 text-sm text-ink-soft">
          {{
            t('tasks.page.summary', {
              count: store.tasks.length,
              plural: store.tasks.length === 1 ? '' : 's',
              laneCount: store.lanes.length,
              lanePlural: store.lanes.length === 1 ? '' : 's',
            })
          }}
        </p>
      </div>
      <BaseButton variant="primary" @click="openCreateModal()">{{ t('tasks.page.newTask') }}</BaseButton>
    </header>

    <div class="mb-6 flex flex-wrap items-center gap-4">
      <div class="inline-flex rounded-standard border border-mist-light p-0.5" role="group"
        :aria-label="t('tasks.viewToggle.label')">
        <button type="button"
          class="inline-flex items-center gap-1.5 rounded-[0.25rem] px-3 py-1.5 text-sm font-medium transition-colors"
          :aria-pressed="store.viewMode === 'list'" :title="t('tasks.viewToggle.list')"
          :class="store.viewMode === 'list' ? 'bg-pine text-white' : 'text-ink-soft'"
          @click="store.setViewMode('list')">
          <List class="h-4 w-4 shrink-0" aria-hidden="true" />
          <span class="hidden sm:inline">{{ t('tasks.viewToggle.list') }}</span>
          <span class="sr-only sm:hidden">{{ t('tasks.viewToggle.list') }}</span>
        </button>
        <button type="button"
          class="inline-flex items-center gap-1.5 rounded-[0.25rem] px-3 py-1.5 text-sm font-medium transition-colors"
          :aria-pressed="store.viewMode === 'kanban'" :title="t('tasks.viewToggle.kanban')"
          :class="store.viewMode === 'kanban' ? 'bg-pine text-white' : 'text-ink-soft'"
          @click="store.setViewMode('kanban')">
          <KanbanSquare class="h-4 w-4 shrink-0" aria-hidden="true" />
          <span class="hidden sm:inline">{{ t('tasks.viewToggle.kanban') }}</span>
          <span class="sr-only sm:hidden">{{ t('tasks.viewToggle.kanban') }}</span>
        </button>
      </div>

      <div class="inline-flex rounded-standard border border-mist-light p-0.5" role="group"
        :aria-label="t('tasks.sortToggle.label')">
        <button type="button" class="rounded-[0.25rem] px-3 py-1.5 text-sm font-medium transition-colors"
          :aria-pressed="store.sortMode === 'custom'"
          :class="store.sortMode === 'custom' ? 'bg-pine text-white' : 'text-ink-soft'"
          @click="store.setSortMode('custom')">
          {{ t('tasks.sortToggle.custom') }}
        </button>
        <button type="button" class="rounded-[0.25rem] px-3 py-1.5 text-sm font-medium transition-colors"
          :aria-pressed="store.sortMode === 'priority'"
          :class="store.sortMode === 'priority' ? 'bg-pine text-white' : 'text-ink-soft'"
          @click="store.setSortMode('priority')">
          {{ t('tasks.sortToggle.priority') }}
        </button>
      </div>

      <p v-if="store.sortMode === 'priority'" class="text-xs text-mist">
        {{ t('tasks.sortToggle.disabledHint') }}
      </p>
    </div>

    <div class="flex-1 min-h-0 flex flex-col">
      <KanbanBoard v-if="store.viewMode === 'kanban'" @edit-task="openEditModal" @add-task="openCreateModal" />
      <TaskListView v-else @edit-task="openEditModal" />
    </div>

    <TaskFormModal v-if="isModalOpen" :lanes="store.lanes" :editing-task="editingTask" :default-lane-id="defaultLaneId"
      @close="closeModal" @submit="handleSubmit" />
  </div>
</template>
