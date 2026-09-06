<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useJournalDraft } from '@/composables/useJournalDraft'
import { formatDateLabel } from '@/lib/utils'

const { store, draft, saveState, handleInput } = useJournalDraft()
const { t } = useI18n()
</script>

<template>
  <div class="flex flex-1 flex-col px-4 py-4 md:px-8 md:py-6">
    <div class="mb-4 flex shrink-0 items-baseline justify-between">
      <h2 class="font-display text-2xl text-ink">
        {{ formatDateLabel(store.selectedDate) }}
      </h2>
      <span class="text-xs text-mist" role="status">
        {{ saveState === 'saved' ? t('journal.editor.savedToDevice') : t('journal.editor.saving') }}
      </span>
    </div>

    <div class="flex-1">
      <textarea v-model="draft" :placeholder="t('journal.editor.placeholder')"
        class="min-h-full w-full resize-none rounded-standard border border-mist-light bg-surface p-4 text-[0.95rem] leading-relaxed text-ink outline-none focus:border-pine"
        style="field-sizing: content" @input="handleInput" />
    </div>
  </div>
</template>
