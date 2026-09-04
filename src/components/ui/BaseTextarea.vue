<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue: string
    id?: string
    placeholder?: string
    rows?: number
    resize?: boolean
  }>(),
  { rows: 3, resize: false },
)

defineEmits<{ 'update:modelValue': [string] }>()
</script>

<template>
  <textarea
    :id="id"
    :value="modelValue"
    :placeholder="placeholder"
    :rows="rows"
    class="w-full rounded-standard border border-mist-light bg-paper p-3 text-sm text-ink outline-none focus:border-pine dark:border-ink-dark-border dark:bg-ink-dark-surface-2 dark:text-ink-dark-text"
    :class="resize ? '' : 'resize-none'"
    @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
  />
</template>
