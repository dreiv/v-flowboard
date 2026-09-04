import { useStorage } from '@vueuse/core'

/**
 * Persisted collapsed/expanded state for the primary navigation sidebar.
 * Extracted as a composable so any component (sidebar, a future settings
 * panel, keyboard shortcut handler, ...) can read/toggle it without
 * reaching into AppSidebar's internals.
 */
export function useSidebarCollapse() {
  const isCollapsed = useStorage('flowboard.sidebarCollapsed', false)

  function toggle() {
    isCollapsed.value = !isCollapsed.value
  }

  return { isCollapsed, toggle }
}
