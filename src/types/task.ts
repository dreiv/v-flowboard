export type Priority = 'low' | 'medium' | 'high' | 'urgent'

export interface Task {
  id: string
  title: string
  description?: string
  priority: Priority
  laneId: string
  order: number
  createdAt: string
}

export interface Lane {
  id: string
  name: string
  isDefault: boolean
}

export type SortMode = 'custom' | 'priority'
export type TaskViewMode = 'list' | 'kanban'

export const PRIORITY_ORDER: Record<Priority, number> = {
  urgent: 0,
  high: 1,
  medium: 2,
  low: 3,
}

// Display labels moved to i18n (tasks.priority.*) - this map now only
// carries the sort weight, which is domain logic, not user-facing text.
