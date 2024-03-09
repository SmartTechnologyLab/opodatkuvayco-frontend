<script setup lang="ts">
import Button from 'primevue/button'
import { useAttrs } from 'vue'
import type { Icons, Severities } from './constants'

const attrs = useAttrs()

const props = defineProps<{
  icon?: Icons
  severity?: Severities
  rounded?: boolean
  outlined?: boolean
  raised?: boolean
}>()
</script>

<template>
  <Button v-bind="{ ...props, ...attrs }">
    <slot />
  </Button>
</template>
