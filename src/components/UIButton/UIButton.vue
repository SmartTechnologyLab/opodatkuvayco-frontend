<script setup lang="ts">
import Button from 'primevue/button'
import { Icons, Severities } from './constants'

defineProps<{
  icon?: Icons
  severity?: Severities
  rounded?: boolean
  outlined?: boolean
  raised?: boolean
}>()

defineEmits(['click'])
</script>

<template>
  <Button v-bind="$props" @click="$emit('click')">
    <slot></slot>
  </Button>
</template>
