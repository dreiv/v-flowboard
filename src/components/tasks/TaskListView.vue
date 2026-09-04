<script setup lang="ts">
import { computed } from 'vue'
import draggable from 'vuedraggable'
import { useTaskStore } from '@/stores/task'
import TaskCard from '@/components/tasks/TaskCard.vue'
import type { Task } from '@/types/task'

const store = useTaskStore()

const emit = defineEmits<{ editTask: [task: Task] }>()

function laneName(laneId: string): string {
  return store.lanes.find((l) => l.id === laneId)?.name ?? 'Unassigned'
}

// Group tasks by lane while preserving each lane's sort order, for list display.
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

function handleDelete(id: string) {
  store.deleteTask(id)
}

function handleChangeLane(id: string, laneId: string) {
  store.moveTaskToLane(id, laneId)
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <div v-if="store.tasks.length === 0" class="rounded-standard border border-dashed border-mist-light p-8 text-center text-sm text-mist dark:border-ink-dark-border">
      No tasks yet. Add your first one to get moving.
    </div>

    <section v-for="group in groups" :key="group.lane.id">
      <h3 class="mb-2 text-xs font-medium uppercase tracking-wide text-mist dark:text-ink-dark-text-soft">
        {{ laneName(group.lane.id) }} · {{ group.tasks.length }}
      </h3>
      <draggable
        :model-value="group.tasks"
        :group="{ name: 'tasks' }"
        item-key="id"
        :disabled="store.sortMode !== 'custom'"
        handle=".drag-handle"
        ghost-class="opacity-40"
        class="flex flex-col gap-2"
        @update:model-value="(v: Task[]) => handleLaneReorder(group.lane.id, v)"
      >
        <template #item="{ element }">
          <TaskCard
            :task="element"
            :lanes="store.lanes"
            :draggable="store.sortMode === 'custom'"
            variant="list"
            @edit="emit('editTask', $event)"
            @delete="handleDelete"
            @change-lane="handleChangeLane"
          />
        </template>
      </draggable>
    </section>
  </div>
</template>
