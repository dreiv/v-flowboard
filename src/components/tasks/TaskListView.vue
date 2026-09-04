<script setup lang="ts">
import { computed } from 'vue'
import draggable from 'vuedraggable'
import { useI18n } from 'vue-i18n'
import { useTaskStore } from '@/stores/task'
import { useDragAnnounce } from '@/composables/useDragAnnounce'
import TaskCard from '@/components/tasks/TaskCard.vue'
import type { Task } from '@/types/task'

const store = useTaskStore()
const { t } = useI18n()
const { message: announceMessage, announce } = useDragAnnounce()

const emit = defineEmits<{ editTask: [task: Task] }>()

function laneName(laneId: string): string {
  return store.lanes.find((l) => l.id === laneId)?.name ?? t('tasks.unassignedLane')
}

const groups = computed(() =>
  store.lanes.map((lane) => ({
    lane,
    tasks: store.tasksForLane(lane.id),
  })),
)

function handleLaneReorder(laneId: string, value: Task[]) {
  store.reorderLane(
    laneId,
    value.map((t) => t.id),
  )
}

function onDragEnd(laneName: string, tasks: Task[], e: { newIndex?: number; item?: HTMLElement }) {
  if (e.newIndex === undefined) return
  const id = e.item?.dataset.id
  const task = id ? tasks.find((t) => t.id === id) : undefined
  if (!task) return
  announce(
    t('tasks.a11y.reorderAnnounce', {
      title: task.title,
      position: e.newIndex + 1,
      total: tasks.length,
      lane: laneName,
    }),
  )
}

function handleDelete(id: string) {
  store.deleteTask(id)
}

function handleChangeLane(id: string, laneId: string) {
  store.moveTaskToLane(id, laneId)
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <p class="sr-only" role="status" aria-live="polite">{{ announceMessage }}</p>

    <div v-if="store.tasks.length === 0"
      class="rounded-standard border border-dashed border-mist-light p-8 text-center text-sm text-mist dark:border-ink-dark-border">
      {{ t('tasks.emptyState') }}
    </div>

    <section v-for="group in groups" :key="group.lane.id">
      <h3 class="mb-2 text-xs font-medium uppercase tracking-wide text-mist dark:text-ink-dark-text-soft">
        {{ laneName(group.lane.id) }} · {{ group.tasks.length }}
      </h3>
      <draggable :model-value="group.tasks" :group="{ name: 'tasks' }" item-key="id"
        :disabled="store.sortMode !== 'custom'" handle=".drag-handle" ghost-class="opacity-40"
        class="flex flex-col gap-2" role="list" :aria-label="laneName(group.lane.id)"
        @update:model-value="(v) => handleLaneReorder(group.lane.id, v)"
        @end="(e) => onDragEnd(laneName(group.lane.id), group.tasks, e)">
        <template #item="{ element }">
          <div role="listitem" :data-id="element.id">
            <TaskCard :task="element" :lanes="store.lanes" :draggable="store.sortMode === 'custom'" variant="list"
              @edit="emit('editTask', $event)" @delete="handleDelete" @change-lane="handleChangeLane" />
          </div>
        </template>
      </draggable>
    </section>
  </div>
</template>
