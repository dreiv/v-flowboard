import { useStorage } from '@vueuse/core'

/** Persisted collapsed/expanded state for the primary nav sidebar. */
export function useSidebarCollapse() {
  const isCollapsed = useStorage('flowboard.sidebarCollapsed', false)

  function toggle() {
    isCollapsed.value = !isCollapsed.value
  }

  return { isCollapsed, toggle }
}
