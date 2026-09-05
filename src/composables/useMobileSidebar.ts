import { ref } from 'vue'

/**
 * Transient open/closed state for the mobile navigation drawer.
 *
 * Kept at module scope so the top-bar toggle and the sidebar stay in sync.
 * Unlike the desktop collapse state (which is persisted), this is ephemeral:
 * the drawer starts closed on every load.
 */
const isMobileOpen = ref(false)

export function useMobileSidebar() {
  function open() {
    isMobileOpen.value = true
  }

  function close() {
    isMobileOpen.value = false
  }

  function toggle() {
    isMobileOpen.value = !isMobileOpen.value
  }

  return { isMobileOpen, open, close, toggle }
}
