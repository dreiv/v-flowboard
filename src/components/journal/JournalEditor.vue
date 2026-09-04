<script setup lang="ts">
import { ref, watch } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import { useJournalStore } from '@/stores/journal'
import { formatDateLabel } from '@/lib/utils'

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
</script>

<template>
  <div class="flex flex-1 flex-col px-8 py-6">
    <div class="mb-4 flex items-baseline justify-between">
      <h2 class="font-display text-2xl text-ink dark:text-ink-dark-text">
        {{ formatDateLabel(store.selectedDate) }}
      </h2>
      <span class="text-xs text-mist dark:text-ink-dark-text-soft">
        {{ saveState === 'saved' ? 'Saved to this device' : 'Saving…' }}
      </span>
    </div>

    <textarea
      v-model="draft"
      placeholder="Write about your day..."
      class="min-h-[60vh] flex-1 resize-none rounded-standard border border-mist-light bg-surface p-4 text-[0.95rem] leading-relaxed text-ink outline-none focus:border-pine dark:border-ink-dark-border dark:bg-ink-dark-surface dark:text-ink-dark-text"
      @input="handleInput"
    />
  </div>
</template>
