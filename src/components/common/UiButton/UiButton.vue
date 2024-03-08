<script setup lang="ts">
import Button from 'primevue/button'
import { Icons, Severities } from './constants'
import { useAttrs } from 'vue'

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
