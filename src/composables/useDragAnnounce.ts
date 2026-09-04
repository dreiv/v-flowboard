import { ref } from 'vue'

/** Polite live-region message for drag-and-drop outcomes (vuedraggable has no built-in SR announcement). */
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
