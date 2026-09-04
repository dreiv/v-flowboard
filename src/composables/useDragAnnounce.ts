import { ref } from 'vue'

/**
 * Holds a single polite live-region message for announcing drag-and-drop
 * outcomes to screen reader users, since vuedraggable's mouse/touch
 * reordering has no built-in SR announcement. One shared composable instance
 * per board keeps the announcement text and the aria-live region in sync
 * without prop-drilling through every lane/card.
 */
export function useDragAnnounce() {
  const message = ref('')

  function announce(text: string) {
    // Clear first so identical consecutive messages still get announced by
    // most screen readers (re-setting the same text alone is often ignored).
    message.value = ''
    requestAnimationFrame(() => {
      message.value = text
    })
  }

  return { message, announce }
}
