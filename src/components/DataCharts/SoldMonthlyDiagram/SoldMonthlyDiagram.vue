<script setup lang="ts">
import { computed, toRefs } from 'vue'
import type { Deal, Operation } from '@/components/common/DataTable/mocks'
import UiChart from '@/components/common/UiChart/UiChart.vue'
import { getResultByTickerEachMonth } from '@/components/DataCharts/common/helpers'
import { stackedGraphOptions } from '@/components/DataCharts/common/constants'
import UiCard from '@/components/common/UiCard/UiCard.vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  deals: Deal[]
  stacked: boolean
  operation: Operation
}>()

const { t } = useI18n()

const { deals, stacked, operation } = toRefs(props)

const monthlySoldChartData = computed(() =>
  getResultByTickerEachMonth(operation.value, `${operation.value}.uah`)(deals.value)
)

const currentOperationText = computed(() => (operation.value === 'purchase' ? t('charts.purchase') : t('charts.sale')))

const chartOptions = computed(() => (stacked.value ? stackedGraphOptions : undefined))
</script>

<template>
  <UiCard>
    <template #title>
      <h2>{{ t('charts.titles.soldMonthlyGraphByAsset', { operation: currentOperationText }) }}</h2>
    </template>
    <UiChart type="bar" :chartData="monthlySoldChartData" :options="chartOptions" />
  </UiCard>
</template>
