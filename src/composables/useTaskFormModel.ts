import { reactive, watch, type Ref } from 'vue'
import type { Lane, Priority, Task } from '@/types/task'

export interface TaskFormPayload {
  title: string
  description?: string
  priority: Priority
  laneId: string
}

/**
 * Owns the reactive form state and submit-payload shaping for the task
 * create/edit form. Extracted out of TaskFormModal.vue (Dependency
 * Inversion) so the modal component stays a thin view over this state.
 */
export function useTaskFormModel(
  editingTask: Ref<Task | null | undefined>,
  defaultLaneId: Ref<string | undefined>,
  lanes: Ref<Lane[]>,
) {
  const form = reactive<TaskFormPayload>({
    title: '',
    description: '',
    priority: 'medium',
    laneId: defaultLaneId.value ?? lanes.value[0]?.id ?? '',
  })

  watch(
    editingTask,
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

  function toPayload(): TaskFormPayload | null {
    if (!form.title.trim()) return null
    return {
      title: form.title,
      description: form.description || undefined,
      priority: form.priority,
      laneId: form.laneId,
    }
  }

  return { form, toPayload }
}
