<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import DarkModeToggle from '@/components/ui/DarkModeToggle.vue'

const route = useRoute()
const { t } = useI18n()

const navItems = [
  { to: '/tasks', labelKey: 'nav.tasks', match: 'tasks' },
  { to: '/journal', labelKey: 'nav.journal', match: 'journal' },
] as const
</script>

<template>
  <aside class="flex h-full w-56 shrink-0 flex-col bg-pine-dark px-4 py-5 text-ink-dark-text">
    <div class="mb-8 px-1">
      <span class="font-display text-[1.6rem] italic leading-none text-white">{{ t('nav.brand') }}</span>
      <p class="mt-1 text-xs text-ink-dark-text-soft">{{ t('nav.tagline') }}</p>
    </div>

    <nav class="flex flex-1 flex-col gap-1" :aria-label="t('nav.primary')">
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
        {{ t(item.labelKey) }}
      </RouterLink>
    </nav>

    <DarkModeToggle class="mt-4" />
  </aside>
</template>
