import { reactive, watch, type Ref } from 'vue'
import type { Lane, Priority, Task } from '@/types/task'

export interface TaskFormPayload {
  title: string
  description?: string
  priority: Priority
  laneId: string
}

/** Reactive form state + submit-payload shaping for the task create/edit form. */
export function useTaskFormModel(
  editingTask: Ref<Task | null | undefined>,
  defaultLaneId: Ref<string | undefined>,
  lanes: Ref<Lane[]>,
) {
  const form = reactive({
    title: '',
    description: '',
    priority: 'medium' as Priority,
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
