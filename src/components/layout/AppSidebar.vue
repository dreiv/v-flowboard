<script setup lang="ts">
import { onMounted, onUnmounted, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ListTodo, NotebookPen, ChevronsLeft, ChevronsRight, X } from '@lucide/vue'
import DarkModeToggle from '@/components/ui/DarkModeToggle.vue'
import IconButton from '@/components/ui/IconButton.vue'
import { useSidebarCollapse } from '@/composables/useSidebarCollapse'
import { useMobileSidebar } from '@/composables/useMobileSidebar'

const route = useRoute()
const { t } = useI18n()
const { isCollapsed, toggle } = useSidebarCollapse()
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
  <!-- Mobile backdrop: only rendered while the drawer is open, hidden on desktop. -->
  <div v-if="isMobileOpen" class="fixed inset-0 z-30 bg-ink/40 md:hidden" aria-hidden="true" @click="close" />

  <aside
    class="fixed inset-y-0 left-0 z-40 flex w-64 flex-col overflow-hidden bg-pine-dark py-5 text-ink-dark-text transition-transform duration-200 ease-in-out md:static md:z-auto md:translate-x-0 md:transition-[width]"
    :class="[isMobileOpen ? 'translate-x-0' : '-translate-x-full', isCollapsed ? 'md:w-16 md:px-2' : 'md:w-56 md:px-4']"
    :aria-label="t('nav.primary')">
    <div class="mb-8 flex items-center justify-between gap-2 px-1">
      <span class="min-w-0 truncate font-display text-[1.6rem] italic leading-none text-white"
        :class="isCollapsed ? 'md:hidden' : ''">
        {{ t('nav.brand') }}
      </span>

      <div class="md:hidden">
        <IconButton class="shrink-0 text-ink-dark-text-soft! hover:bg-white/5! hover:text-white!"
          :ariaLabel="t('nav.close')" @click="close">
          <X class="h-5 w-5" aria-hidden="true" />
        </IconButton>
      </div>

      <!-- Desktop: collapse/expand the sidebar. -->
      <div class="hidden md:block" :class="isCollapsed ? 'mx-auto' : ''">
        <IconButton class="shrink-0 text-ink-dark-text-soft! hover:bg-white/5! hover:text-white!"
          :ariaLabel="isCollapsed ? t('nav.expand') : t('nav.collapse')" @click="toggle">
          <ChevronsLeft v-if="!isCollapsed" class="h-5 w-5" aria-hidden="true" />
          <ChevronsRight v-else class="h-5 w-5" aria-hidden="true" />
        </IconButton>
      </div>
    </div>

    <p class="-mt-6 mb-8 px-1 text-xs text-ink-dark-text-soft" :class="isCollapsed ? 'md:hidden' : ''">
      {{ t('nav.tagline') }}
    </p>

    <nav class="flex flex-1 flex-col gap-1" :aria-label="t('nav.primary')">
      <RouterLink v-for="item in navItems" :key="item.to" :to="item.to"
        class="flex min-w-0 items-center gap-3 rounded-standard px-3 py-2 text-sm font-medium transition-colors" :class="[
          route.name === item.match
            ? 'bg-white/10 text-white'
            : 'text-ink-dark-text-soft hover:bg-white/5 hover:text-white',
          isCollapsed ? 'md:justify-center md:gap-0 md:px-0' : '',
        ]" :title="isCollapsed ? t(item.labelKey) : undefined" :aria-label="isCollapsed ? t(item.labelKey) : undefined"
        @click="close">
        <component :is="item.icon" class="h-5 w-5 shrink-0" aria-hidden="true" />
        <span class="block truncate" :class="isCollapsed ? 'md:hidden' : ''">{{ t(item.labelKey) }}</span>
      </RouterLink>
    </nav>

    <DarkModeToggle class="mt-4" :collapsed="isCollapsed" />
  </aside>
</template>
