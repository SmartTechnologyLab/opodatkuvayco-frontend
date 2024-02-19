<script setup lang="ts">
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Card from 'primevue/card'
import { path } from 'ramda'
import { useI18n } from 'vue-i18n'

import { type Ref, ref } from 'vue'
import { type Deal, getDeal } from '@/components/common/DataTable/mocks'
import { FormatType, resultHeaders } from '@/components/common/DataTable/constants'

const { d, n } = useI18n()
const deals = ref([
  getDeal({
    ticker: 'DAL',
    quantity: 2,
    purchaseRate: 29.2549,
    purchasePrice: 28.88,
    purchaseCommission: 1.49,
    saleRate: 36.5686,
    salePrice: 42.42,
    saleCommission: 1.62
  }),
  getDeal(),
  getDeal(),
  getDeal(),
  getDeal()
])

const getFormattedData = (data: Ref<Deal[]>, field: string, type?: FormatType) => {
  const value = path(field.split('.'), data)

  const [formatted] = [
    type === FormatType.Date && d(new Date(value)),
    type === FormatType.Number && n(value),
    type === FormatType.CurrencyUSD && n(value, { style: 'currency', currency: 'USD' }),
    type === FormatType.CurrencyUAH && n(value, 'currency'),
    type === FormatType.Percent && n(value, 'percent'),
    value
  ].filter(Boolean)

  return formatted
}
</script>

<template>
  <Card>
    <template #title>
      {{ $t('Результат') }}
    </template>

    <template #content>
      <DataTable :value="deals" size="small" tableStyle="min-width: 50rem">
        <Column v-for="{ field, header, type } in resultHeaders" :key="field" :field :header="$t(header)">
          <template #body="{ data, field }"> {{ getFormattedData(data, field, type) }}</template>
        </Column>
      </DataTable>
    </template>
  </Card>
</template>

<style scoped></style>
