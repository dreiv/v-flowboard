<script setup lang="ts">
// Small icon-only affordance. Requires an explicit ariaLabel prop (Interface
// Segregation: it does not accept the full BaseButton contract because an
// icon-only control has different, narrower requirements - a visible label
// isn't one of them, but an accessible name always is).
withDefaults(
  defineProps<{
    ariaLabel: string
    type?: 'button' | 'submit'
    disabled?: boolean
  }>(),
  { type: 'button', disabled: false },
)

defineEmits<{ click: [MouseEvent] }>()
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    :aria-label="ariaLabel"
    class="rounded-standard px-2 py-1 text-sm text-ink-soft transition-colors hover:bg-paper-dim disabled:cursor-not-allowed disabled:opacity-50 dark:text-ink-dark-text-soft dark:hover:bg-ink-dark-surface-2"
    @click="(e) => $emit('click', e)"
  >
    <slot />
  </button>
</template>
