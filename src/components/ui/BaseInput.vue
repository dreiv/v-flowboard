<script setup lang="ts">
// Domain-agnostic text/date input; callers supply label text and bind v-model.
withDefaults(
  defineProps<{
    modelValue: string
    id?: string
    type?: 'text' | 'date'
    placeholder?: string
    required?: boolean
    autofocus?: boolean
  }>(),
  { type: 'text', required: false, autofocus: false },
)

defineEmits<{ 'update:modelValue': [string] }>()
</script>

<template>
  <input :id="id" :type="type" :value="modelValue" :placeholder="placeholder" :required="required"
    :autofocus="autofocus"
    class="w-full rounded-standard border border-mist-light bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-pine dark:border-ink-dark-border dark:bg-ink-dark-surface-2 dark:text-ink-dark-text"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)" />
</template>
