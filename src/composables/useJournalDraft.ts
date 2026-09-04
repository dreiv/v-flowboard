import { ref, watch } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import { useJournalStore } from '@/stores/journal'

/** Debounced-autosave draft lifecycle for the journal editor. */
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
