<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import DarkModeToggle from '@/components/ui/DarkModeToggle.vue'
import IconButton from '@/components/ui/IconButton.vue'
import { useSidebarCollapse } from '@/composables/useSidebarCollapse'

const route = useRoute()
const { t } = useI18n()
const { isCollapsed, toggle } = useSidebarCollapse()

const navItems = [
  { to: '/tasks', labelKey: 'nav.tasks', match: 'tasks' },
  { to: '/journal', labelKey: 'nav.journal', match: 'journal' },
] as const
</script>

<template>
  <aside
    class="flex h-full shrink-0 flex-col overflow-hidden bg-pine-dark px-4 py-5 text-ink-dark-text transition-[width] duration-200 ease-in-out"
    :class="isCollapsed ? 'w-16 px-2' : 'w-56'">
    <div class="mb-8 flex items-center justify-between gap-2 px-1">
      <span v-if="!isCollapsed" class="min-w-0 truncate font-display text-[1.6rem] italic leading-none text-white">
        {{ t('nav.brand') }}
      </span>
      <IconButton class="shrink-0 text-ink-dark-text-soft! hover:bg-white/5! hover:text-white!"
        :class="isCollapsed ? 'mx-auto' : ''" :ariaLabel="isCollapsed ? t('nav.expand') : t('nav.collapse')"
        @click="toggle">
        {{ isCollapsed ? '»' : '«' }}
      </IconButton>
    </div>
    <p v-if="!isCollapsed" class="-mt-6 mb-8 px-1 text-xs text-ink-dark-text-soft">
      {{ t('nav.tagline') }}
    </p>

    <nav class="flex flex-1 flex-col gap-1" :aria-label="t('nav.primary')">
      <RouterLink v-for="item in navItems" :key="item.to" :to="item.to"
        class="min-w-0 rounded-standard px-3 py-2 text-sm font-medium transition-colors" :class="[
          route.name === item.match
            ? 'bg-white/10 text-white'
            : 'text-ink-dark-text-soft hover:bg-white/5 hover:text-white',
          isCollapsed ? 'text-center' : '',
        ]" :title="isCollapsed ? t(item.labelKey) : undefined"
        :aria-label="isCollapsed ? t(item.labelKey) : undefined">
        <span v-if="isCollapsed" aria-hidden="true">{{ t(item.labelKey).charAt(0) }}</span>
        <span v-else class="block truncate">{{ t(item.labelKey) }}</span>
      </RouterLink>
    </nav>

    <DarkModeToggle class="mt-4" :collapsed="isCollapsed" />
  </aside>
</template>
