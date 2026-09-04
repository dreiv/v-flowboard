<script setup lang="ts">
import { computed, ref } from 'vue'
import draggable from 'vuedraggable'
import type { Lane, Task } from '@/types/task'
import TaskCard from '@/components/tasks/TaskCard.vue'

const props = defineProps<{
  lane: Lane
  lanes: Lane[]
  tasks: Task[]
  dragEnabled: boolean
}>()

const emit = defineEmits<{
  edit: [task: Task]
  delete: [id: string]
  changeLane: [id: string, laneId: string]
  reorder: [laneId: string, orderedIds: string[]]
  rename: [id: string, name: string]
  remove: [id: string]
  addTask: [laneId: string]
}>()

const localTasks = computed({
  get: () => props.tasks,
  set: (value: Task[]) => {
    emit(
      'reorder',
      props.lane.id,
      value.map((t) => t.id),
    )
  },
})

const isRenaming = ref(false)
const renameValue = ref(props.lane.name)

function startRename() {
  renameValue.value = props.lane.name
  isRenaming.value = true
}

function commitRename() {
  if (renameValue.value.trim()) {
    emit('rename', props.lane.id, renameValue.value)
  }
  isRenaming.value = false
}
</script>

<template>
  <div class="flex w-72 shrink-0 flex-col border-l-2 border-pine/60 pl-3 dark:border-pine/40">
    <div class="mb-3 flex items-center justify-between gap-2">
      <div class="min-w-0 flex-1">
        <input
          v-if="isRenaming"
          v-model="renameValue"
          type="text"
          autofocus
          class="w-full rounded-standard border border-pine bg-paper px-1.5 py-0.5 text-sm font-medium text-ink outline-none dark:bg-ink-dark-surface-2 dark:text-ink-dark-text"
          @keydown.enter="commitRename"
          @keydown.esc="isRenaming = false"
          @blur="commitRename"
        />
        <button
          v-else
          type="button"
          class="truncate text-sm font-medium text-ink hover:underline dark:text-ink-dark-text"
          :disabled="lane.isDefault"
          :class="lane.isDefault ? 'cursor-default hover:no-underline' : ''"
          @click="!lane.isDefault && startRename()"
        >
          {{ lane.name }}
        </button>
      </div>
      <span class="shrink-0 text-xs text-mist dark:text-ink-dark-text-soft">{{ tasks.length }}</span>
      <button
        v-if="!lane.isDefault"
        type="button"
        class="shrink-0 text-xs text-mist hover:text-urgent"
        aria-label="Delete lane"
        @click="emit('remove', lane.id)"
      >
        ✕
      </button>
    </div>

    <draggable
      v-model="localTasks"
      :group="{ name: 'tasks' }"
      item-key="id"
      :disabled="!dragEnabled"
      handle=".drag-handle"
      ghost-class="opacity-40"
      class="flex min-h-[3rem] flex-1 flex-col gap-2"
    >
      <template #item="{ element }">
        <TaskCard
          :task="element"
          :lanes="lanes"
          :draggable="dragEnabled"
          variant="card"
          @edit="emit('edit', $event)"
          @delete="emit('delete', $event)"
          @change-lane="(id, laneId) => emit('changeLane', id, laneId)"
        />
      </template>
    </draggable>

    <button
      type="button"
      class="mt-2 rounded-standard border border-dashed border-mist-light py-2 text-xs font-medium text-mist transition-colors hover:border-pine hover:text-pine dark:border-ink-dark-border"
      @click="emit('addTask', lane.id)"
    >
      + Add task
    </button>
  </div>
</template>
