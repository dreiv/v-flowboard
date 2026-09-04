<script setup lang="ts">
// Generic select primitive. Options are passed as plain {value,label} pairs
// rather than domain objects (Lane, Priority, ...) so this component never
// needs to change when a new domain starts using it (Interface Segregation).
defineProps<{
  modelValue: string
  id?: string
  ariaLabel?: string
  options: { value: string; label: string }[]
}>()

defineEmits<{ 'update:modelValue': [string] }>()
</script>

<template>
  <select
    :id="id"
    :aria-label="ariaLabel"
    :value="modelValue"
    class="w-full rounded-standard border border-mist-light bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-pine dark:border-ink-dark-border dark:bg-ink-dark-surface-2 dark:text-ink-dark-text"
    @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
  >
    <option v-for="opt in options" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
  </select>
</template>
