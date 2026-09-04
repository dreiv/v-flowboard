<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

// Dark-mode source of truth; index.html reads the same 'vueuse-color-scheme' key pre-mount to avoid a first-paint flash.
const isDark = useDark({
  selector: 'html',
  attribute: 'class',
  valueDark: 'dark',
  valueLight: '',
})
const toggleDark = useToggle(isDark)

withDefaults(defineProps<{ collapsed?: boolean }>(), { collapsed: false })

const { t } = useI18n()
</script>

<template>
  <button type="button" role="switch" :aria-checked="isDark" :aria-label="t('darkMode.toggleLabel')"
    :title="collapsed ? t('darkMode.toggleLabel') : undefined"
    class="flex w-full min-w-0 items-center rounded-standard border border-white/10 px-3 py-2 text-sm text-ink-dark-text-soft transition-colors hover:text-white"
    :class="collapsed ? 'justify-center' : 'justify-between'" @click="toggleDark()">
    <span v-if="!collapsed" class="min-w-0 truncate">
      {{ isDark ? t('darkMode.dark') : t('darkMode.light') }}
    </span>
    <span class="relative h-4 w-8 shrink-0 rounded-full transition-colors"
      :class="[isDark ? 'bg-pine' : 'bg-white/20', collapsed ? '' : 'ml-2']" aria-hidden="true">
      <span class="absolute left-0 top-0.5 h-3 w-3 rounded-full bg-white transition-transform"
        :class="isDark ? 'translate-x-4.5' : 'translate-x-0.5'" />
    </span>
  </button>
</template>
