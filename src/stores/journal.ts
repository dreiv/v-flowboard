import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useStorage } from '@vueuse/core'
import type { JournalEntry } from '@/types/journal'
import { makeId, todayKey } from '@/lib/utils'

export const useJournalStore = defineStore('journal', () => {
  const entries = useStorage<JournalEntry[]>('flowboard.journal', [])
  const selectedDate = ref<string>(todayKey())

  const entriesByDateDesc = computed(() =>
    [...entries.value].sort((a, b) => (a.date < b.date ? 1 : -1)),
  )

  const selectedEntry = computed(() => entries.value.find((e) => e.date === selectedDate.value))

  function selectDate(date: string): void {
    selectedDate.value = date
  }

  /** Fetches the entry for a date, or an empty draft if none exists yet. */
  function entryForDate(date: string): JournalEntry | undefined {
    return entries.value.find((e) => e.date === date)
  }

  /** Creates or updates the entry for a date with new content. */
  function saveEntry(date: string, content: string): void {
    const existing = entries.value.find((e) => e.date === date)
    if (existing) {
      existing.content = content
      existing.updatedAt = new Date().toISOString()
      return
    }
    if (content.trim() === '') return
    const entry: JournalEntry = {
      id: makeId(),
      date,
      content,
      updatedAt: new Date().toISOString(),
    }
    entries.value.push(entry)
  }

  function deleteEntry(date: string): void {
    entries.value = entries.value.filter((e) => e.date !== date)
  }

  return {
    entries,
    selectedDate,
    entriesByDateDesc,
    selectedEntry,
    selectDate,
    entryForDate,
    saveEntry,
    deleteEntry,
  }
})
