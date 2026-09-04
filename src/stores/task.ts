import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useStorage } from '@vueuse/core'
import type { Lane, Priority, SortMode, Task, TaskViewMode } from '@/types/task'
import { PRIORITY_ORDER } from '@/types/task'
import { makeId } from '@/lib/utils'

const DEFAULT_LANES: Lane[] = [
  { id: 'todo', name: 'To do', isDefault: true },
  { id: 'doing', name: 'Doing', isDefault: true },
  { id: 'done', name: 'Done', isDefault: true },
]

export const useTaskStore = defineStore('task', () => {
  const lanes = useStorage<Lane[]>('flowboard.lanes', DEFAULT_LANES, undefined, {
    mergeDefaults: false,
  })
  const tasks = useStorage<Task[]>('flowboard.tasks', [])

  const sortMode = useStorage<SortMode>('flowboard.sortMode', 'custom')
  const viewMode = useStorage<TaskViewMode>('flowboard.viewMode', 'kanban')

  const laneDeleteError = ref<string | null>(null)

  // ---- Derived data -------------------------------------------------

  function tasksForLane(laneId: string): Task[] {
    const inLane = tasks.value.filter((t) => t.laneId === laneId)
    if (sortMode.value === 'priority') {
      return [...inLane].sort((a, b) => {
        const diff = PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]
        return diff !== 0 ? diff : a.order - b.order
      })
    }
    return [...inLane].sort((a, b) => a.order - b.order)
  }

  const taskCountByLane = computed(() => {
    const counts: Record<string, number> = {}
    for (const lane of lanes.value) counts[lane.id] = 0
    for (const task of tasks.value) counts[task.laneId] = (counts[task.laneId] ?? 0) + 1
    return counts
  })

  const allTasksSorted = computed(() => {
    if (sortMode.value === 'priority') {
      return [...tasks.value].sort((a, b) => {
        const diff = PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]
        return diff !== 0 ? diff : a.order - b.order
      })
    }
    return [...tasks.value].sort((a, b) => a.order - b.order)
  })

  // ---- Task CRUD ------------------------------------------------------

  function createTask(input: {
    title: string
    description?: string
    priority: Priority
    laneId: string
  }): Task {
    const laneTasks = tasks.value.filter((t) => t.laneId === input.laneId)
    const maxOrder = laneTasks.reduce((max, t) => Math.max(max, t.order), -1)
    const task: Task = {
      id: makeId(),
      title: input.title.trim(),
      description: input.description?.trim() || undefined,
      priority: input.priority,
      laneId: input.laneId,
      order: maxOrder + 1,
      createdAt: new Date().toISOString(),
    }
    tasks.value.push(task)
    return task
  }

  function updateTask(id: string, patch: Partial<Omit<Task, 'id' | 'createdAt'>>): void {
    const task = tasks.value.find((t) => t.id === id)
    if (!task) return
    Object.assign(task, patch)
  }

  function deleteTask(id: string): void {
    tasks.value = tasks.value.filter((t) => t.id !== id)
  }

  function moveTaskToLane(id: string, laneId: string): void {
    const task = tasks.value.find((t) => t.id === id)
    if (!task) return
    const laneTasks = tasks.value.filter((t) => t.laneId === laneId && t.id !== id)
    const maxOrder = laneTasks.reduce((max, t) => Math.max(max, t.order), -1)
    task.laneId = laneId
    task.order = maxOrder + 1
  }

  /** Replace the ordered task list for a lane after a drag-and-drop reorder. */
  function reorderLane(laneId: string, orderedIds: string[]): void {
    orderedIds.forEach((id, index) => {
      const task = tasks.value.find((t) => t.id === id)
      if (task) {
        task.laneId = laneId
        task.order = index
      }
    })
  }

  // ---- Lane CRUD ------------------------------------------------------

  function createLane(name: string): Lane {
    const lane: Lane = { id: makeId(), name: name.trim(), isDefault: false }
    lanes.value.push(lane)
    return lane
  }

  function renameLane(id: string, name: string): void {
    const lane = lanes.value.find((l) => l.id === id)
    if (lane) lane.name = name.trim()
  }

  function deleteLane(id: string): boolean {
    const hasTasks = tasks.value.some((t) => t.laneId === id)
    if (hasTasks) {
      laneDeleteError.value = 'lane-has-tasks'
      return false
    }
    lanes.value = lanes.value.filter((l) => l.id !== id)
    laneDeleteError.value = null
    return true
  }

  function clearLaneDeleteError(): void {
    laneDeleteError.value = null
  }

  function setSortMode(mode: SortMode): void {
    sortMode.value = mode
  }

  function setViewMode(mode: TaskViewMode): void {
    viewMode.value = mode
  }

  return {
    lanes,
    tasks,
    sortMode,
    viewMode,
    laneDeleteError,
    tasksForLane,
    taskCountByLane,
    allTasksSorted,
    createTask,
    updateTask,
    deleteTask,
    moveTaskToLane,
    reorderLane,
    createLane,
    renameLane,
    deleteLane,
    clearLaneDeleteError,
    setSortMode,
    setViewMode,
  }
})
