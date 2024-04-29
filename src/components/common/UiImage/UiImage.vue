<script setup lang="ts">
import { useAttrs } from 'vue'

const props = defineProps<{
  src: string
  alt: string
}>()

const attrs = useAttrs()
</script>

<template>
  <img v-bind="{ ...props, ...attrs }" />
</template>

<style scoped></style>
