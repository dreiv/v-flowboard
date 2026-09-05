<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { ChevronLeft, ChevronRight } from '@lucide/vue'
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
  <div
    class="flex w-full shrink-0 flex-col border-b border-mist-light pb-4 md:h-full md:w-64 md:border-b-0 md:border-r md:pb-0 md:pr-4">
    <div class="mb-4 flex items-center gap-1">
      <IconButton :ariaLabel="t('journal.sidebar.previousDay')" @click="shiftDay(-1)">
        <ChevronLeft class="h-5 w-5" aria-hidden="true" />
      </IconButton>
      <BaseButton variant="ghost" class="flex-1 text-center font-medium text-link" @click="goToToday">
        {{ t('journal.sidebar.today') }}
      </BaseButton>
      <IconButton :ariaLabel="t('journal.sidebar.nextDay')" @click="shiftDay(1)">
        <ChevronRight class="h-5 w-5" aria-hidden="true" />
      </IconButton>
    </div>

    <label for="journal-date-picker" class="mb-1 text-xs font-medium text-ink-soft">
      {{ t('journal.sidebar.jumpToDate') }}
    </label>
    <BaseInput id="journal-date-picker" type="date" class="mb-4" :model-value="store.selectedDate"
      @update:model-value="store.selectDate" />

    <p class="mb-2 text-xs font-medium uppercase tracking-wide text-mist">
      {{ t('journal.sidebar.entriesHeading') }}
    </p>
    <nav class="flex max-h-48 flex-1 flex-col gap-0.5 overflow-y-auto md:max-h-none md:min-h-0"
      :aria-label="t('journal.sidebar.entriesNav')">
      <button v-for="date in recentDates" :key="date" type="button"
        class="rounded-standard px-2 py-1.5 text-left text-sm transition-colors" :class="date === store.selectedDate
          ? 'bg-accent-soft text-accent-contrast'
          : 'text-ink-soft hover:bg-paper-dim'
          " @click="store.selectDate(date)">
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
