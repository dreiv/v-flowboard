<script setup lang="ts">
// Icon-only button; requires an accessible name (ariaLabel) since it has no visible label.
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
  <button :type="type" :disabled="disabled" :aria-label="ariaLabel"
    class="rounded-standard px-2 py-1 text-sm text-ink-soft transition-colors hover:bg-paper-dim disabled:cursor-not-allowed disabled:opacity-50"
    @click="(e) => $emit('click', e)">
    <slot />
  </button>
</template>
