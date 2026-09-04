<script setup lang="ts">
// Domain-agnostic select; takes plain {value,label} pairs, never domain objects.
defineProps<{
  modelValue: string
  id?: string
  ariaLabel?: string
  options: { value: string; label: string }[]
}>()

defineEmits<{ 'update:modelValue': [string] }>()
</script>

<template>
  <select :id="id" :aria-label="ariaLabel" :value="modelValue"
    class="w-full rounded-standard border border-mist-light bg-paper py-2 pl-3 pr-9 text-sm text-ink outline-none focus:border-pine"
    @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)">
    <option v-for="opt in options" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
  </select>
</template>
