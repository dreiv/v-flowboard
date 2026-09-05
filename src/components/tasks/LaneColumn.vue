<script setup lang="ts">
import { computed, ref } from 'vue'
import draggable from 'vuedraggable'
import { useI18n } from 'vue-i18n'
import { X } from '@lucide/vue'
import type { Lane, Task } from '@/types/task'
import TaskCard from '@/components/tasks/TaskCard.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import IconButton from '@/components/ui/IconButton.vue'

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
  announce: [message: string]
}>()

const { t } = useI18n()

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

function onDragEnd(e: { newIndex?: number; item?: HTMLElement }) {
  if (e.newIndex === undefined) return
  const id = e.item?.dataset.id
  const task = id ? props.tasks.find((t) => t.id === id) : undefined
  if (!task) return
  emit(
    'announce',
    t('tasks.a11y.reorderAnnounce', {
      title: task.title,
      position: e.newIndex + 1,
      total: props.tasks.length,
      lane: props.lane.name,
    }),
  )
}

const isRenaming = ref(false)
const renameValue = ref('')
let renameFinished = false

function startRename() {
  renameValue.value = props.lane.name
  renameFinished = false
  isRenaming.value = true
}

function commitRename() {
  if (renameFinished) return
  renameFinished = true
  if (renameValue.value.trim()) {
    emit('rename', props.lane.id, renameValue.value)
  }
  isRenaming.value = false
}

function cancelRename() {
  if (renameFinished) return
  renameFinished = true
  isRenaming.value = false
}
</script>

<template>
  <section class="flex w-72 shrink-0 flex-col border-l-2 border-pine/60 pl-3" :aria-label="lane.name">
    <div class="mb-3 flex items-center justify-between gap-2">
      <div class="min-w-0 flex-1">
        <BaseInput v-if="isRenaming" v-model="renameValue" autofocus class="py-0.5! text-sm! font-medium"
          @keydown.enter="commitRename" @keydown.esc="cancelRename" @blur="commitRename" />
        <button v-else type="button" class="truncate text-sm font-medium text-ink hover:underline"
          :disabled="lane.isDefault" :class="lane.isDefault ? 'cursor-default hover:no-underline' : ''"
          @click="!lane.isDefault && startRename()">
          {{ lane.name }}
        </button>
      </div>
      <span class="shrink-0 text-xs text-mist">{{ tasks.length }}</span>
      <IconButton v-if="!lane.isDefault" class="px-0! shrink-0 text-xs hover:text-urgent"
        :ariaLabel="t('tasks.board.deleteLaneNamed', { name: lane.name })" @click="emit('remove', lane.id)">
        <X class="h-4 w-4" aria-hidden="true" />
      </IconButton>
    </div>

    <draggable v-model="localTasks" :group="{ name: 'tasks' }" item-key="id" :disabled="!dragEnabled"
      handle=".drag-handle" ghost-class="opacity-40" class="flex min-h-[3rem] flex-1 flex-col gap-2" role="list"
      :aria-label="lane.name" @end="onDragEnd">
      <template #item="{ element }">
        <div role="listitem" :data-id="element.id">
          <TaskCard :task="element" :lanes="lanes" :draggable="dragEnabled" variant="card" @edit="emit('edit', $event)"
            @delete="emit('delete', $event)" @change-lane="(id, laneId) => emit('changeLane', id, laneId)" />
        </div>
      </template>
    </draggable>

    <BaseButton variant="secondary" class="mt-2 w-full! border-dashed py-2! text-xs hover:border-pine hover:text-link"
      @click="emit('addTask', lane.id)">
      {{ t('tasks.board.addTaskToLane') }}
    </BaseButton>
  </section>
</template>
