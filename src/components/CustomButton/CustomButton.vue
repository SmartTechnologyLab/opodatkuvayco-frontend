<script setup lang="ts">
import Button from 'primevue/button'

const props = defineProps({
  icon: {
    type: String,
    required: true
  },
  severity: {
    type: String,
    required: false
  }
})

defineEmits(['click-button'])
</script>

<template>
  <Button :icon="props.icon" :severity="props.severity" />
</template>

<style scoped lang="scss"></style>
