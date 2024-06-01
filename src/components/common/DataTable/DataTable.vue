<script setup lang="ts">
import DataTable, { type DataTableCellEditCompleteEvent } from 'primevue/datatable'
import Column from 'primevue/column'
import Card from 'primevue/card'
import { isNil, path } from 'ramda'
import { useI18n } from 'vue-i18n'
import { type Ref } from 'vue'
import { type Deal } from '@/components/common/DataTable/mocks'
import type { Currencies, Table } from '@/components/common/DataTable/types'
import UiInput from '@/components/common/UiInput/UiInput.vue'
import { calendarFields, currencyFields, numberFields } from '@/components/common/DataTable/constants/fieldsList'
import UiNumberInput from '../UiNumberInput/UiNumberInput.vue'
import UiCalendar from '../UiCalendar/UiCalendar.vue'
import { DateFormat } from '../UiCalendar/types'
import { Currency, currenciesSymbols } from '@/constants/currencies'
import { currenciesName, FormatType, dynamicCurrencies } from '@/components/common/DataTable/constants'

const props = defineProps<{
  table: Table
  sortableColumn?: boolean
  removeSortable?: boolean
  notEditableColumns?: string[]
  editMode?: 'cell' | 'row' | undefined
  resizableColumns?: boolean
  currency?: Currency
}>()

defineEmits<{
  (e: 'onCellEdit', event: DataTableCellEditCompleteEvent): void
}>()

const { d, n } = useI18n()

const getFormattedData = (data: Ref<Deal[]>, field: string, type?: FormatType) => {
  const value = path(field.split('.'), data)

  const [formatted] = [
    type === FormatType.Date && d(value),
    type === FormatType.Number && n(value),
    type === FormatType.CurrencyUSD && n(value, { style: 'currency', currency: props.currency || Currency.EUR }),
    type === FormatType.CurrencyUAH && n(value, { style: 'currency', currency: Currency.UAH }),
    type === FormatType.CurrencyUAH && n(value, { style: 'currency', currency: Currency.UAH }),
    type === FormatType.Percent && n(value, 'percent'),
    value
  ].filter(Boolean)

  return formatted
}

const isColumnsEditable = (notEditableColumns: string[] | undefined, field: string) => {
  return !notEditableColumns?.includes(field)
}

const currencyType = (currency?: FormatType): Currency => {
  return currenciesName[currency as Currencies] || Currency.UAH
}

const tableCurrency = (currency: FormatType) => {
  if (currency === FormatType.CurrencyUAH) {
    return currenciesSymbols[Currency.UAH]
  }

  return dynamicCurrencies.includes(currency) ? currenciesSymbols[props.currency as Currency] : ''
}
</script>

<template>
  <Card>
    <template #title>
      <slot name="header" />
    </template>

    <template #content>
      <DataTable
        :value="table.data"
        size="small"
        :removableSort="removeSortable"
        @cell-edit-complete="$emit('onCellEdit', $event)"
        :editMode="editMode"
        scrollable
        :resizable-columns="resizableColumns"
      >
        <Column
          v-for="{ field, header, type } in table.headers"
          :sortable="sortableColumn"
          :key="field"
          :field
          :header="`${$t(header)} ${tableCurrency(type as FormatType)}`"
          style="min-width: 100px"
        >
          <template #body="{ data, field }">
            <slot :name="field" :value="path(field.split('.'), data)" :type="type">
              {{ isNil(type) ? path(field.split('.'), data) || '-' : getFormattedData(data, field, type) }}
            </slot>
          </template>

          <template #editor="{ data, field }" v-if="isColumnsEditable(notEditableColumns, field)">
            <template v-if="calendarFields.includes(field)">
              <UiCalendar v-model="data[field]" :dateFormat="DateFormat.DOTTED" />
            </template>
            <template v-else-if="currencyFields.includes(field)">
              <UiNumberInput v-model="data[field]" mode="currency" :currency="currencyType(type)" />
            </template>
            <template v-else-if="numberFields.includes(field)">
              <UiNumberInput v-model="data[field]" />
            </template>

            <template v-else>
              <UiInput v-model="data[field]" />
            </template>
          </template>
        </Column>

        <template #empty>{{ $t('table.empty') }}</template>
      </DataTable>
      <slot name="add-row" />
    </template>
  </Card>
</template>

<style scoped></style>
