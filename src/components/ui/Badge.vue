<script setup lang="ts">
// Domain-agnostic color pill; PriorityBadge owns the priority→color mapping.
withDefaults(
  defineProps<{
    colorClass: string
    size?: 'sm' | 'md'
  }>(),
  { size: 'md' },
)
</script>

<template>
  <span class="inline-flex items-center gap-1.5 rounded-standard font-medium"
    :class="[colorClass, size === 'sm' ? 'px-1.5 py-0.5 text-[0.7rem]' : 'px-2 py-1 text-xs']">
    <span class="h-1.5 w-1.5 shrink-0 rounded-full bg-current" aria-hidden="true" />
    <slot />
  </span>
</template>
