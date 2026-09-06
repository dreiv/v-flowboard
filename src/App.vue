<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Menu } from '@lucide/vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import IconButton from '@/components/ui/IconButton.vue'
import { useMobileSidebar } from '@/composables/useMobileSidebar'

const { t } = useI18n()
const { open } = useMobileSidebar()
</script>

<template>
  <div class="flex h-screen overflow-hidden">
    <AppSidebar />
    <div class="flex min-w-0 flex-1 flex-col">
      <header class="flex items-center gap-3 border-b border-mist-light px-3 py-2.5 md:hidden">
        <IconButton :ariaLabel="t('nav.openMenu')" @click="open">
          <Menu class="h-5 w-5" aria-hidden="true" />
        </IconButton>
        <span class="font-display text-lg italic leading-none text-ink">{{ t('nav.brand') }}</span>
      </header>
      <main class="flex-1 overflow-y-auto">
        <RouterView />
      </main>
    </div>
  </div>
</template>
