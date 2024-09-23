<script setup lang="ts">
import Dialog from 'primevue/dialog'
import { useAttrs } from 'vue'

const attrs = useAttrs()

const props = defineProps<{
  visible: boolean
}>()

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
}>()
</script>

<template>
  <Dialog
    class="dialog"
    :draggable="false"
    v-bind="{ ...attrs, ...props }"
    @update:visible="emit('update:visible', visible)"
  >
    <slot />

    <template #footer>
      <slot name="footer" />
    </template>
  </Dialog>
</template>

<style scopped lang="scss">
.dialog {
  padding: 2rem;
}
</style>
