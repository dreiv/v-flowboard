<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

const props = defineProps<{ title: string }>()
const emit = defineEmits<{ close: [] }>()

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') emit('close')
}

onMounted(() => document.addEventListener('keydown', onKeydown))
onUnmounted(() => document.removeEventListener('keydown', onKeydown))
</script>

<template>
  <Teleport to="body">
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4" @click.self="emit('close')">
      <div class="w-full max-w-md rounded-standard border border-mist-light bg-surface p-5 shadow-xl" role="dialog"
        aria-modal="true" :aria-label="props.title">
        <div class="mb-4 flex items-center justify-between">
          <h2 class="font-display text-lg text-ink">{{ props.title }}</h2>
          <button type="button" class="rounded-standard px-2 py-1 text-mist hover:bg-paper-dim hover:text-ink"
            aria-label="Close" @click="emit('close')">
            ✕
          </button>
        </div>
        <slot />
      </div>
    </div>
  </Teleport>
</template>
