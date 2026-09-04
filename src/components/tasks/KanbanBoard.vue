<script setup lang="ts">
import { ref } from 'vue'
import { useTaskStore } from '@/stores/task'
import LaneColumn from '@/components/tasks/LaneColumn.vue'
import type { Task } from '@/types/task'

const store = useTaskStore()

const emit = defineEmits<{
  editTask: [task: Task]
  addTask: [laneId: string]
}>()

const isAddingLane = ref(false)
const newLaneName = ref('')

function submitNewLane() {
  if (newLaneName.value.trim()) {
    store.createLane(newLaneName.value)
  }
  newLaneName.value = ''
  isAddingLane.value = false
}

function handleDelete(id: string) {
  store.deleteTask(id)
}

function handleChangeLane(id: string, laneId: string) {
  store.moveTaskToLane(id, laneId)
}

function handleReorder(laneId: string, orderedIds: string[]) {
  store.reorderLane(laneId, orderedIds)
}

function handleRename(id: string, name: string) {
  store.renameLane(id, name)
}

function handleRemoveLane(id: string) {
  store.deleteLane(id)
}
</script>

<template>
  <div>
    <p
      v-if="store.laneDeleteError"
      class="mb-3 rounded-standard border border-urgent/30 bg-urgent-bg px-3 py-2 text-sm text-urgent"
    >
      {{ store.laneDeleteError }}
      <button type="button" class="ml-2 underline" @click="store.clearLaneDeleteError()">
        Dismiss
      </button>
    </p>

    <div class="flex gap-4 overflow-x-auto pb-4">
      <LaneColumn
        v-for="lane in store.lanes"
        :key="lane.id"
        :lane="lane"
        :lanes="store.lanes"
        :tasks="store.tasksForLane(lane.id)"
        :drag-enabled="store.sortMode === 'custom'"
        @edit="emit('editTask', $event)"
        @delete="handleDelete"
        @change-lane="handleChangeLane"
        @reorder="handleReorder"
        @rename="handleRename"
        @remove="handleRemoveLane"
        @add-task="emit('addTask', $event)"
      />

      <div class="w-56 shrink-0">
        <div v-if="isAddingLane" class="flex flex-col gap-2">
          <input
            v-model="newLaneName"
            type="text"
            autofocus
            placeholder="Lane name"
            class="rounded-standard border border-mist-light bg-paper px-2 py-1.5 text-sm outline-none focus:border-pine dark:border-ink-dark-border dark:bg-ink-dark-surface-2 dark:text-ink-dark-text"
            @keydown.enter="submitNewLane"
            @keydown.esc="isAddingLane = false"
          />
          <div class="flex gap-2">
            <button
              type="button"
              class="rounded-standard bg-pine px-3 py-1 text-xs font-medium text-white hover:bg-pine-dark"
              @click="submitNewLane"
            >
              Add
            </button>
            <button
              type="button"
              class="rounded-standard px-3 py-1 text-xs text-mist hover:bg-paper-dim"
              @click="isAddingLane = false"
            >
              Cancel
            </button>
          </div>
        </div>
        <button
          v-else
          type="button"
          class="flex h-10 w-full items-center justify-center rounded-standard border border-dashed border-mist-light text-sm text-mist transition-colors hover:border-pine hover:text-pine dark:border-ink-dark-border"
          @click="isAddingLane = true"
        >
          + New lane
        </button>
      </div>
    </div>
  </div>
</template>
