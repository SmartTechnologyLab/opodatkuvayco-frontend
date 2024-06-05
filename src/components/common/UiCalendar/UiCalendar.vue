<script setup lang="ts">
import Calendar from 'primevue/calendar'
import { useAttrs } from 'vue'
import type { DateFormat } from './types'

const attrs = useAttrs()

const props = defineProps<{
  dateFormat?: DateFormat
}>()
</script>

<template>
  <Calendar v-bind="{ ...attrs, ...props }" />
</template>
