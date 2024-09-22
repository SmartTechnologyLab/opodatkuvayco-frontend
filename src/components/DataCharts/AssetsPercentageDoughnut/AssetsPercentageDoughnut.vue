<script setup lang="ts">
import { computed, toRefs } from 'vue'
import type { Deal } from '@/components/common/DataTable/mocks'
import UiCard from '@/components/common/UiCard/UiCard.vue'
import { setChartData } from '@/components/common/UiChart/common/helpers'
import UiChart from '@/components/common/UiChart/UiChart.vue'
import { getTradesPercentageResultByTicker } from '@/components/DataCharts/common/helpers'

const props = defineProps<{
  deals: Deal[]
}>()

const { deals } = toRefs(props)

const totalAssetsPercentage = computed(() => {
  const tradesPercentageValue = getTradesPercentageResultByTicker('quantity')(deals.value)

  return setChartData(Object.values(tradesPercentageValue), Object.keys(tradesPercentageValue))
})
</script>

<template>
  <UiCard>
    <template #title> Assets </template>

    <UiChart type="doughnut" :chartData="totalAssetsPercentage" />
  </UiCard>
</template>
