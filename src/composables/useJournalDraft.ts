import { ref, watch } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import { useJournalStore } from '@/stores/journal'

/**
 * Owns the debounced-autosave draft lifecycle for the journal editor.
 * Extracted out of JournalEditor.vue (Dependency Inversion) so the
 * component only wires refs to the template; the persistence/debounce
 * logic is independently testable and reusable.
 */
export function useJournalDraft() {
  const store = useJournalStore()

  const draft = ref('')
  const saveState = ref<'saved' | 'pending'>('saved')

  function loadDraftFor(date: string) {
    draft.value = store.entryForDate(date)?.content ?? ''
    saveState.value = 'saved'
  }

  watch(() => store.selectedDate, loadDraftFor, { immediate: true })

  const debouncedSave = useDebounceFn((date: string, content: string) => {
    store.saveEntry(date, content)
    saveState.value = 'saved'
  }, 600)

  function handleInput() {
    saveState.value = 'pending'
    debouncedSave(store.selectedDate, draft.value)
  }

  return { store, draft, saveState, handleInput }
}
