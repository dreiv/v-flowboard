<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useTaskStore } from '@/stores/task'
import { useDragAnnounce } from '@/composables/useDragAnnounce'
import LaneColumn from '@/components/tasks/LaneColumn.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import type { Task } from '@/types/task'

const store = useTaskStore()
const { t } = useI18n()
const { message: announceMessage, announce } = useDragAnnounce()

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
  const lane = store.lanes.find((l) => l.id === laneId)
  const task = store.tasks.find((tk) => tk.id === id)
  store.moveTaskToLane(id, laneId)
  if (lane && task) {
    announce(t('tasks.a11y.laneChangeAnnounce', { title: task.title, lane: lane.name }))
  }
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
    <p class="sr-only" role="status" aria-live="polite">{{ announceMessage }}</p>

    <p v-if="store.laneDeleteError"
      class="mb-3 rounded-standard border border-urgent/30 bg-urgent-bg px-3 py-2 text-sm text-urgent-text"
      role="alert">
      {{ t('tasks.errors.laneHasTasks') }}
      <BaseButton variant="ghost" size="sm" class="ml-2 px-0! underline" @click="store.clearLaneDeleteError()">
        {{ t('common.buttons.dismiss') }}
      </BaseButton>
    </p>

    <div class="flex gap-4 overflow-x-auto pb-4">
      <LaneColumn v-for="lane in store.lanes" :key="lane.id" :lane="lane" :lanes="store.lanes"
        :tasks="store.tasksForLane(lane.id)" :drag-enabled="store.sortMode === 'custom'"
        @edit="emit('editTask', $event)" @delete="handleDelete" @change-lane="handleChangeLane" @reorder="handleReorder"
        @rename="handleRename" @remove="handleRemoveLane" @add-task="emit('addTask', $event)" @announce="announce" />

      <div class="w-56 shrink-0">
        <div v-if="isAddingLane" class="flex flex-col gap-2">
          <BaseInput v-model="newLaneName" autofocus :placeholder="t('tasks.board.newLanePlaceholder')"
            @keydown.enter="submitNewLane" @keydown.esc="isAddingLane = false" />
          <div class="flex gap-2">
            <BaseButton variant="primary" size="sm" @click="submitNewLane">{{ t('common.buttons.add') }}</BaseButton>
            <BaseButton variant="ghost" size="sm" @click="isAddingLane = false">{{ t('common.buttons.cancel') }}
            </BaseButton>
          </div>
        </div>
        <BaseButton v-else variant="secondary" class="h-10! w-full! border-dashed" @click="isAddingLane = true">
          {{ t('tasks.board.addLane') }}
        </BaseButton>
      </div>
    </div>
  </div>
</template>
