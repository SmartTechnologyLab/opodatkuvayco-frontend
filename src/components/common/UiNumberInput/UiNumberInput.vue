<script setup lang="ts">
import InputNumber from 'primevue/inputnumber'
import { useAttrs } from 'vue'
import type { Currency } from './types'

const attrs = useAttrs()

const props = defineProps<{
  mode?: 'currency' | 'decimal' | undefined
  currency?: Currency
  minFractionDigits?: number
  maxFractionDigits?: number
  preffix?: string
  suffix?: string
}>()
</script>

<template>
  <InputNumber v-bind="{ ...attrs, ...props }" />
</template>
