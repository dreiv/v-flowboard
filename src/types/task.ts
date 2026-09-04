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

// Sort weights only; display labels live in i18n (tasks.priority.*).
