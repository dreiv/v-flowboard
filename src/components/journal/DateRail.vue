<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useJournalStore } from '@/stores/journal'
import { formatDateShort, todayKey, toDateKey } from '@/lib/utils'
import IconButton from '@/components/ui/IconButton.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseInput from '@/components/ui/BaseInput.vue'

const store = useJournalStore()
const { t } = useI18n()

const today = todayKey()

const recentDates = computed(() => {
  const fromEntries = store.entriesByDateDesc.map((e) => e.date)
  if (fromEntries.includes(today)) return fromEntries
  return [today, ...fromEntries]
})

function goToToday() {
  store.selectDate(today)
}

function shiftDay(delta: number) {
  const [y, m, d] = store.selectedDate.split('-').map(Number)
  const next = new Date(y, m - 1, d + delta)
  store.selectDate(toDateKey(next))
}
</script>

<template>
  <div class="flex w-64 shrink-0 flex-col border-r border-mist-light pr-4 dark:border-ink-dark-border">
    <div class="mb-4 flex items-center gap-1">
      <IconButton :aria-label="t('journal.sidebar.previousDay')" @click="shiftDay(-1)">‹</IconButton>
      <BaseButton
        variant="ghost"
        class="flex-1 text-center font-medium text-pine dark:text-pine-light"
        @click="goToToday"
      >
        {{ t('journal.sidebar.today') }}
      </BaseButton>
      <IconButton :aria-label="t('journal.sidebar.nextDay')" @click="shiftDay(1)">›</IconButton>
    </div>

    <label for="journal-date-picker" class="mb-1 text-xs font-medium text-ink-soft dark:text-ink-dark-text-soft">
      {{ t('journal.sidebar.jumpToDate') }}
    </label>
    <BaseInput
      id="journal-date-picker"
      type="date"
      class="mb-4"
      :model-value="store.selectedDate"
      @update:model-value="store.selectDate"
    />

    <p class="mb-2 text-xs font-medium uppercase tracking-wide text-mist dark:text-ink-dark-text-soft">
      {{ t('journal.sidebar.entriesHeading') }}
    </p>
    <nav class="flex flex-col gap-0.5 overflow-y-auto" :aria-label="t('journal.sidebar.entriesNav')">
      <button
        v-for="date in recentDates"
        :key="date"
        type="button"
        class="rounded-standard px-2 py-1.5 text-left text-sm transition-colors"
        :class="
          date === store.selectedDate
            ? 'bg-pine-light text-pine-dark dark:bg-ink-dark-surface-2 dark:text-pine-light'
            : 'text-ink-soft hover:bg-paper-dim dark:text-ink-dark-text-soft dark:hover:bg-ink-dark-surface-2'
        "
        @click="store.selectDate(date)"
      >
        <span class="inline-flex items-center gap-1.5">
          <span v-if="date === today" class="h-1.5 w-1.5 shrink-0 rounded-full bg-clay" aria-hidden="true" />
          {{ formatDateShort(date) }}
        </span>
      </button>
      <p v-if="recentDates.length === 0" class="px-2 py-1.5 text-xs text-mist">
        {{ t('journal.sidebar.noEntries') }}
      </p>
    </nav>
  </div>
</template>
