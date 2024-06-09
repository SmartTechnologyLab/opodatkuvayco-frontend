<script setup lang="ts">
import InputNumber from 'primevue/inputnumber'
import { useAttrs } from 'vue'
import { Currency } from '@/constants/currencies'

const attrs = useAttrs()

const props = defineProps<{
  mode?: 'currency' | 'decimal' | undefined
  currency?: Currency
  minFractionDigits?: number
  maxFractionDigits?: number
  prefix?: string
  suffix?: string
}>()
</script>

<template>
  <InputNumber v-bind="{ ...attrs, ...props }" />
</template>
