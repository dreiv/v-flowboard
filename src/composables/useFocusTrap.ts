import { onMounted, onUnmounted, type Ref } from 'vue'

/**
 * Traps Tab/Shift+Tab focus cycling within `containerRef` while active, and
 * moves initial focus into it. Extracted as a composable (Dependency
 * Inversion) so any dialog/overlay can opt in without re-implementing the
 * keyboard logic.
 */
export function useFocusTrap(containerRef: Ref<HTMLElement | null>) {
  function focusableEls(): HTMLElement[] {
    const container = containerRef.value
    if (!container) return []
    return Array.from(
      container.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    ).filter((el) => el.offsetParent !== null)
  }

  function onKeydown(e: KeyboardEvent) {
    if (e.key !== 'Tab') return
    const els = focusableEls()
    if (els.length === 0) return
    const first = els[0]
    const last = els[els.length - 1]

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }

  onMounted(() => {
    document.addEventListener('keydown', onKeydown)
    // Move focus into the trap on mount so keyboard users land inside it.
    requestAnimationFrame(() => focusableEls()[0]?.focus())
  })

  onUnmounted(() => document.removeEventListener('keydown', onKeydown))
}
