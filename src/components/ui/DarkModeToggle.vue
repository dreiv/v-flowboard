<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

// Single source of truth for dark mode: syncs with system preference by
// default, persists manual overrides to localStorage under
// 'vueuse-color-scheme', and targets <html class="dark">. index.html applies
// the same stored value before Vue mounts to avoid a first-paint flash.
const isDark = useDark({
  selector: 'html',
  attribute: 'class',
  valueDark: 'dark',
  valueLight: '',
})
const toggleDark = useToggle(isDark)

const { t } = useI18n()
</script>

<template>
  <button
    type="button"
    role="switch"
    :aria-checked="isDark"
    :aria-label="t('darkMode.toggleLabel')"
    class="flex items-center justify-between rounded-standard border border-white/10 px-3 py-2 text-sm text-ink-dark-text-soft transition-colors hover:text-white"
    @click="toggleDark()"
  >
    <span>{{ isDark ? t('darkMode.dark') : t('darkMode.light') }}</span>
    <span class="relative ml-2 h-4 w-8 rounded-full transition-colors" :class="isDark ? 'bg-pine' : 'bg-white/20'" aria-hidden="true">
      <span
        class="absolute top-0.5 h-3 w-3 rounded-full bg-white transition-transform"
        :class="isDark ? 'translate-x-4' : 'translate-x-0.5'"
      />
    </span>
  </button>
</template>
