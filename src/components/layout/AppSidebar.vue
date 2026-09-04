<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { RouterLink, useRoute } from 'vue-router'

const isDark = useDark({
  selector: 'html',
  attribute: 'class',
  valueDark: 'dark',
  valueLight: '',
})
const toggleDark = useToggle(isDark)

const route = useRoute()

const navItems = [
  { to: '/tasks', label: 'Tasks', match: 'tasks' },
  { to: '/journal', label: 'Journal', match: 'journal' },
]
</script>

<template>
  <aside
    class="flex h-full w-56 shrink-0 flex-col bg-pine-dark px-4 py-5 text-ink-dark-text"
  >
    <div class="mb-8 px-1">
      <span class="font-display text-[1.6rem] italic leading-none text-white">Flowboard</span>
      <p class="mt-1 text-xs text-ink-dark-text-soft">Tasks &amp; daily notes</p>
    </div>

    <nav class="flex flex-1 flex-col gap-1" aria-label="Primary">
      <RouterLink
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        class="rounded-standard px-3 py-2 text-sm font-medium transition-colors"
        :class="
          route.name === item.match
            ? 'bg-white/10 text-white'
            : 'text-ink-dark-text-soft hover:bg-white/5 hover:text-white'
        "
      >
        {{ item.label }}
      </RouterLink>
    </nav>

    <button
      type="button"
      class="mt-4 flex items-center justify-between rounded-standard border border-white/10 px-3 py-2 text-sm text-ink-dark-text-soft transition-colors hover:text-white"
      @click="toggleDark()"
    >
      <span>{{ isDark ? 'Dark mode' : 'Light mode' }}</span>
      <span
        class="relative h-4 w-8 rounded-full transition-colors"
        :class="isDark ? 'bg-pine' : 'bg-white/20'"
      >
        <span
          class="absolute top-0.5 h-3 w-3 rounded-full bg-white transition-transform"
          :class="isDark ? 'translate-x-4' : 'translate-x-0.5'"
        />
      </span>
    </button>
  </aside>
</template>
