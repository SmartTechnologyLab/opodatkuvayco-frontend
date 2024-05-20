<script setup lang="ts">
import Button from 'primevue/button'
import { useAttrs } from 'vue'
import { Icons, Severities } from './constants'

const attrs = useAttrs()

const props = defineProps<{
  icon?: Icons
  severity?: Severities
  rounded?: boolean
  outlined?: boolean
  raised?: boolean
}>()

defineEmits<{
  (e: 'clickBtn'): void
}>()
</script>

<template>
  <Button v-bind="{ ...props, ...attrs }" @click="$emit('clickBtn')">
    <slot />
  </Button>
</template>
