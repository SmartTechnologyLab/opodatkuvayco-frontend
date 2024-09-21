<script setup lang="ts">
import { computed, toRefs, useAttrs } from 'vue'
import Chart, { type ChartProps } from 'primevue/chart'
import type { ChartData } from './common/types'
import { mergeRight } from 'ramda'
import { DEFAULT_CHART_OPTIONS } from './common/constants'

const attrs = useAttrs()

const props = defineProps<{
  chartData: ChartData
  options?: ChartProps['options']
}>()

const { options } = toRefs(props)

const mergedOptions = computed(() => mergeRight(DEFAULT_CHART_OPTIONS, options.value))
</script>

<template>
  <Chart :data="chartData" :options="mergedOptions" v-bind="{ ...attrs }" />
</template>

<style scoped lang="scss"></style>
