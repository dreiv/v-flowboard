<script setup lang="ts">
import { computed } from 'vue'
import { useJournalStore } from '@/stores/journal'
import { formatDateShort, todayKey, toDateKey } from '@/lib/utils'

const store = useJournalStore()

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
      <button
        type="button"
        class="rounded-standard px-2 py-1 text-sm text-ink-soft hover:bg-paper-dim dark:text-ink-dark-text-soft dark:hover:bg-ink-dark-surface-2"
        aria-label="Previous day"
        @click="shiftDay(-1)"
      >
        ‹
      </button>
      <button
        type="button"
        class="flex-1 rounded-standard px-2 py-1 text-center text-sm font-medium text-pine hover:bg-pine-light dark:text-pine-light dark:hover:bg-ink-dark-surface-2"
        @click="goToToday"
      >
        Today
      </button>
      <button
        type="button"
        class="rounded-standard px-2 py-1 text-sm text-ink-soft hover:bg-paper-dim dark:text-ink-dark-text-soft dark:hover:bg-ink-dark-surface-2"
        aria-label="Next day"
        @click="shiftDay(1)"
      >
        ›
      </button>
    </div>

    <label for="journal-date-picker" class="mb-1 text-xs font-medium text-ink-soft dark:text-ink-dark-text-soft">
      Jump to date
    </label>
    <input
      id="journal-date-picker"
      type="date"
      :value="store.selectedDate"
      class="mb-4 rounded-standard border border-mist-light bg-paper px-2 py-1.5 text-sm text-ink outline-none focus:border-pine dark:border-ink-dark-border dark:bg-ink-dark-surface-2 dark:text-ink-dark-text"
      @change="store.selectDate(($event.target as HTMLInputElement).value)"
    />

    <p class="mb-2 text-xs font-medium uppercase tracking-wide text-mist dark:text-ink-dark-text-soft">
      Entries
    </p>
    <nav class="flex flex-col gap-0.5 overflow-y-auto" aria-label="Journal entries by date">
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
      <p v-if="recentDates.length === 0" class="px-2 py-1.5 text-xs text-mist">No entries yet.</p>
    </nav>
  </div>
</template>
