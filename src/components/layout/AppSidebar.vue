<script setup lang="ts">
import { onMounted, onUnmounted, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ListTodo, NotebookPen, X } from '@lucide/vue'
import DarkModeToggle from '@/components/ui/DarkModeToggle.vue'
import IconButton from '@/components/ui/IconButton.vue'
import { useMobileSidebar } from '@/composables/useMobileSidebar'

const route = useRoute()
const { t } = useI18n()
const { isMobileOpen, close } = useMobileSidebar()

const navItems = [
  { to: '/tasks', labelKey: 'nav.tasks', match: 'tasks', icon: ListTodo },
  { to: '/journal', labelKey: 'nav.journal', match: 'journal', icon: NotebookPen },
] as const

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') close()
}

watch(
  isMobileOpen,
  (open) => {
    if (typeof document === 'undefined') return
    document.body.style.overflow = open ? 'hidden' : ''
  },
  { immediate: true },
)

onMounted(() => document.addEventListener('keydown', onKeydown))
onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <div v-if="isMobileOpen" class="fixed inset-0 z-30 bg-ink/40 md:hidden" aria-hidden="true" @click="close" />

  <aside
    class="fixed inset-y-0 left-0 z-40 flex w-64 flex-col overflow-hidden bg-pine-dark px-4 py-5 text-ink-dark-text transition-transform duration-200 ease-in-out md:static md:z-auto md:w-56 md:translate-x-0"
    :class="isMobileOpen ? 'translate-x-0' : '-translate-x-full'" :aria-label="t('nav.primary')">
    <div class="mb-8 flex items-center justify-between gap-2 px-1">
      <span class="min-w-0 truncate font-display text-[1.6rem] italic leading-none text-white">
        {{ t('nav.brand') }}
      </span>

      <IconButton class="shrink-0 text-ink-dark-text-soft! hover:bg-white/5! hover:text-white! md:hidden"
        :ariaLabel="t('nav.close')" @click="close">
        <X class="h-5 w-5" aria-hidden="true" />
      </IconButton>
    </div>

    <p class="-mt-6 mb-8 px-1 text-xs text-ink-dark-text-soft">
      {{ t('nav.tagline') }}
    </p>

    <nav class="flex flex-1 flex-col gap-1" :aria-label="t('nav.primary')">
      <RouterLink v-for="item in navItems" :key="item.to" :to="item.to"
        class="flex min-w-0 items-center gap-3 rounded-standard px-3 py-2 text-sm font-medium transition-colors" :class="route.name === item.match
          ? 'bg-white/10 text-white'
          : 'text-ink-dark-text-soft hover:bg-white/5 hover:text-white'
          " @click="close">
        <component :is="item.icon" class="h-5 w-5 shrink-0" aria-hidden="true" />
        <span class="block truncate">{{ t(item.labelKey) }}</span>
      </RouterLink>
    </nav>

    <DarkModeToggle class="mt-4" />
  </aside>
</template>
