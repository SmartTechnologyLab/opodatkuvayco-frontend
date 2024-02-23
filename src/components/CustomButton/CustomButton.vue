<script setup lang="ts">
import Button from 'primevue/button'
import { icons, severities } from '@/components/CustomButton/utils/assets'

const { icon, severity, label, rounded, outlined } = defineProps({
  icon: {
    type: String,
    required: false,
    default: icons.cross
  },
  severity: {
    type: String,
    required: false,
    default: severities.secondary
  },
  label: {
    type: String,
    required: false
  },
  rounded: {
    type: Boolean,
    required: false
  },
  outlined: {
    type: Boolean,
    required: false
  },
  raised: {
    type: Boolean,
    required: false
  }
})

defineEmits(['click-button'])
</script>

<template>
  <Button :icon="icon" :severity="severity" :rounded="rounded" :label="label" :outlined="outlined" :raised="raised" />
</template>
