<script setup lang="ts">
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Card from 'primevue/card'
import { path } from 'ramda'
import { useI18n } from 'vue-i18n'

import { type Ref } from 'vue'
import { type Deal } from '@/components/common/DataTable/mocks'
import { FormatType, type Table } from '@/components/common/DataTable/types'
import { isNil } from 'ramda'

defineProps({
  table: {
    type: Object as () => Table,
    required: true
  },
  title: {
    type: String,
    default: ''
  }
})

const { d, n } = useI18n()

const getFormattedData = (data: Ref<Deal[]>, field: string, type?: FormatType) => {
  const value = path(field.split('.'), data)

  const [formatted] = [
    type === FormatType.Date && d(value),
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
    <template #title v-if="title">
      {{ $t(title) }}
    </template>

    <template #content>
      <DataTable :value="table.data" size="small" tableStyle="min-width: 50rem">
        <Column v-for="{ field, header, type } in table.headers" :key="field" :field :header="$t(header)">
          <template #body="{ data, field }">
            <slot :name="field" :value="path(field.split('.'), data)" :type="type">
              {{ isNil(type) ? path(field.split('.'), data) || '-' : getFormattedData(data, field, type) }}
            </slot>
          </template>
        </Column>

        <template #empty>{{ $t('table.empty') }}</template>
      </DataTable>
    </template>
  </Card>
</template>

<style scoped></style>
