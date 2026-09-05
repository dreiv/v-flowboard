<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { X } from '@lucide/vue'
import { useFocusTrap } from '@/composables/useFocusTrap'
import IconButton from '@/components/ui/IconButton.vue'

const props = defineProps<{ title: string }>()
const emit = defineEmits<{ close: [] }>()
const { t } = useI18n()

const dialogRef = ref<HTMLElement | null>(null)
useFocusTrap(dialogRef)

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') emit('close')
}

onMounted(() => document.addEventListener('keydown', onKeydown))
onUnmounted(() => document.removeEventListener('keydown', onKeydown))
</script>

<template>
  <Teleport to="body">
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4" @click.self="emit('close')">
      <div ref="dialogRef" class="w-full max-w-md rounded-standard border border-mist-light bg-surface p-5 shadow-xl"
        role="dialog" aria-modal="true" :aria-label="props.title">
        <div class="mb-4 flex items-center justify-between">
          <h2 class="font-display text-lg text-ink">{{ props.title }}</h2>
          <IconButton :ariaLabel="t('common.buttons.close')" @click="emit('close')">
            <X class="h-4 w-4" aria-hidden="true" />
          </IconButton>
        </div>
        <slot />
      </div>
    </div>
  </Teleport>
</template>
