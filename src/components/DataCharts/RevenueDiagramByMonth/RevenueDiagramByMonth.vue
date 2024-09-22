<script setup lang="ts">
import type { Deal, Operation } from '@/components/common/DataTable/mocks'
import UiCard from '@/components/common/UiCard/UiCard.vue'
import { setChartData } from '@/components/common/UiChart/common/helpers'
import UiChart from '@/components/common/UiChart/UiChart.vue'
import { computed, toRefs } from 'vue'
import { getRevenueByPurchaseMonth } from '../common/helpers'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  deals: Deal[]
  operation: Operation
}>()

const { t } = useI18n()

const { deals, operation } = toRefs(props)

const currentOperationText = computed(() => (operation.value === 'purchase' ? t('charts.purchase') : t('charts.sale')))

const chartDataByMonth = computed(() => {
  const revenueByPurchaseDate = getRevenueByPurchaseMonth(operation.value, `${operation.value}.uah`)(deals.value)

  return setChartData(Object.values(revenueByPurchaseDate), Object.keys(revenueByPurchaseDate))
})
</script>

<template>
  <UiCard>
    <template #title>
      <h2>{{ t('charts.titles.soldMonthlyGraph', { operation: currentOperationText }) }}</h2>
    </template>
    <UiChart type="bar" :chartData="chartDataByMonth" />
  </UiCard>
</template>
