<script setup lang="ts">
import { toRef } from 'vue'
import { useI18n } from 'vue-i18n'
import ModalDialog from '@/components/ui/ModalDialog.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseTextarea from '@/components/ui/BaseTextarea.vue'
import BaseSelect from '@/components/ui/BaseSelect.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { useTaskFormModel, type TaskFormPayload } from '@/composables/useTaskFormModel'
import type { Lane, Task } from '@/types/task'

const props = defineProps<{
  lanes: Lane[]
  editingTask?: Task | null
  defaultLaneId?: string
}>()

const emit = defineEmits<{
  close: []
  submit: [payload: TaskFormPayload]
}>()

const { t } = useI18n()

const { form, toPayload } = useTaskFormModel(
  toRef(props, 'editingTask'),
  toRef(props, 'defaultLaneId'),
  toRef(props, 'lanes'),
)

const priorityOptions = ['urgent', 'high', 'medium', 'low'].map((value) => ({
  value,
  label: t(`tasks.priority.${value}`),
}))

function handleSubmit() {
  const payload = toPayload()
  if (!payload) return
  emit('submit', payload)
}
</script>

<template>
  <ModalDialog :title="editingTask ? t('tasks.form.titleEdit') : t('tasks.form.titleNew')" @close="emit('close')">
    <form class="flex flex-col gap-4" @submit.prevent="handleSubmit">
      <div>
        <label for="task-title" class="mb-1 block text-xs font-medium text-ink-soft">
          {{ t('tasks.form.titleLabel') }}
        </label>
        <BaseInput id="task-title" v-model="form.title" required autofocus
          :placeholder="t('tasks.form.titlePlaceholder')" />
      </div>

      <div>
        <label for="task-desc" class="mb-1 block text-xs font-medium text-ink-soft">
          {{ t('tasks.form.descriptionLabel') }} <span class="text-mist">{{ t('tasks.form.descriptionOptional')
            }}</span>
        </label>
        <BaseTextarea id="task-desc" v-model="form.description" :rows="3"
          :placeholder="t('tasks.form.descriptionPlaceholder')" />
      </div>

      <div class="grid grid-cols-2 gap-3">
        <div>
          <label for="task-priority" class="mb-1 block text-xs font-medium text-ink-soft">
            {{ t('tasks.form.priorityLabel') }}
          </label>
          <BaseSelect id="task-priority" v-model="form.priority" :options="priorityOptions" />
        </div>

        <div>
          <label for="task-lane" class="mb-1 block text-xs font-medium text-ink-soft">
            {{ t('tasks.form.laneLabel') }}
          </label>
          <BaseSelect id="task-lane" v-model="form.laneId"
            :options="lanes.map((l) => ({ value: l.id, label: l.name }))" />
        </div>
      </div>

      <div class="mt-2 flex justify-end gap-2">
        <BaseButton variant="ghost" @click="emit('close')">{{ t('common.buttons.cancel') }}</BaseButton>
        <BaseButton variant="primary" type="submit">
          {{ editingTask ? t('tasks.form.submitEdit') : t('tasks.form.submitNew') }}
        </BaseButton>
      </div>
    </form>
  </ModalDialog>
</template>
