<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useJournalDraft } from '@/composables/useJournalDraft'
import { formatDateLabel } from '@/lib/utils'

const { store, draft, saveState, handleInput } = useJournalDraft()
const { t } = useI18n()
</script>

<template>
  <div class="flex flex-1 flex-col px-8 py-6">
    <div class="mb-4 flex items-baseline justify-between">
      <h2 class="font-display text-2xl text-ink dark:text-ink-dark-text">
        {{ formatDateLabel(store.selectedDate) }}
      </h2>
      <span class="text-xs text-mist dark:text-ink-dark-text-soft" role="status">
        {{ saveState === 'saved' ? t('journal.editor.savedToDevice') : t('journal.editor.saving') }}
      </span>
    </div>

    <textarea
      v-model="draft"
      :placeholder="t('journal.editor.placeholder')"
      class="min-h-[60vh] flex-1 resize-none rounded-standard border border-mist-light bg-surface p-4 text-[0.95rem] leading-relaxed text-ink outline-none focus:border-pine dark:border-ink-dark-border dark:bg-ink-dark-surface dark:text-ink-dark-text"
      @input="handleInput"
    />
  </div>
</template>
