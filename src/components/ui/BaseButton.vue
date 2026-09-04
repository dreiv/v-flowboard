<script setup lang="ts">
// Domain-agnostic button primitive; new looks come from variant/size, not edits here.
withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger-ghost'
    size?: 'sm' | 'md'
    type?: 'button' | 'submit'
    disabled?: boolean
  }>(),
  { variant: 'secondary', size: 'md', type: 'button', disabled: false },
)

defineEmits<{ click: [MouseEvent] }>()

const base =
  'inline-flex items-center justify-center gap-1.5 rounded-standard font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50'

const variants: Record<string, string> = {
  primary: 'bg-pine text-white hover:bg-pine-dark',
  secondary:
    'border border-mist-light text-ink-soft hover:bg-paper-dim dark:border-ink-dark-border dark:text-ink-dark-text-soft dark:hover:bg-ink-dark-surface-2',
  ghost:
    'text-ink-soft hover:bg-paper-dim dark:text-ink-dark-text-soft dark:hover:bg-ink-dark-surface-2',
  'danger-ghost': 'text-mist hover:text-urgent',
}

const sizes: Record<string, string> = {
  sm: 'px-3 py-1 text-xs',
  md: 'px-4 py-2 text-sm',
}
</script>

<template>
  <button :type="type" :disabled="disabled" :class="[base, variants[variant], sizes[size]]"
    @click="(e) => $emit('click', e)">
    <slot />
  </button>
</template>
