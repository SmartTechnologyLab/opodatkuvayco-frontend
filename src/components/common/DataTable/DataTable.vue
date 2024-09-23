<script setup lang="ts">
import DataTable, { type DataTableCellEditCompleteEvent } from 'primevue/datatable'
import Column from 'primevue/column'
import Card from 'primevue/card'
import { isNil, path } from 'ramda'
import { useI18n } from 'vue-i18n'
import { useAttrs, useSlots, type Ref } from 'vue'
import { type Deal } from '@/components/common/DataTable/mocks'
import type { Table } from '@/components/common/DataTable/types'
import { Currency, currenciesSymbols } from '@/constants/currencies'
import { FormatType, dynamicCurrencies } from '@/components/common/DataTable/constants'

const props = defineProps<{
  table: Table
  notEditableColumns?: string[]
  editMode?: 'cell' | 'row' | undefined
  currency?: Currency
  highLightedCells?: Record<number, unknown[]>
}>()

defineEmits<{
  (e: 'onCellEdit', event: DataTableCellEditCompleteEvent): void
}>()

const { d, n } = useI18n()

const attrs = useAttrs()

const slots = useSlots()

const getFormattedData = (data: Ref<Deal[]>, field: string, type?: FormatType) => {
  const value = path(field.split('.'), data)

  const [formatted] = [
    type === FormatType.Date && d(value),
    type === FormatType.Number && n(value),
    type === FormatType.CurrencyUSD && n(value, { style: 'currency', currency: props.currency || Currency.EUR }),
    type === FormatType.CurrencyUAH && n(value, { style: 'currency', currency: Currency.UAH }),
    type === FormatType.Percent && n(value, 'percent'),
    value
  ].filter(Boolean)

  return formatted
}

const tableCurrency = (currency: FormatType) => {
  if (currency === FormatType.CurrencyUAH) {
    return currenciesSymbols[Currency.UAH]
  }

  return dynamicCurrencies.includes(currency) ? currenciesSymbols[props.currency as Currency] : ''
}

const isCellShouldBeMarked = (field: string, index: number) => {
  return props?.highLightedCells && props?.highLightedCells[index] && props.highLightedCells[index].includes(field)
}
</script>

<template>
  <Card class="data-table">
    <template #title>
      <slot name="title" />
    </template>

    <template #header>
      <slot name="header" />
    </template>

    <template #content>
      <DataTable v-bind="{ ...attrs }" :value="table.data" @cell-edit-complete="$emit('onCellEdit', $event)" :editMode>
        <Column v-if="slots.editRow">
          <template #body="{ index, field, data }">
            <slot name="editRow" :index :field :data />
          </template>
        </Column>

        <Column
          v-for="{ field, header, type, sortable } in table.headers"
          :sortable
          :key="field"
          :field
          :header="`${$t(header)} ${tableCurrency(type as FormatType)}`"
        >
          <template #body="{ data, field, index }">
            <div
              :key="index"
              :class="{
                'data-table__marked-cell': isCellShouldBeMarked(field, index),
                'data-table__unmarked-cell': !isCellShouldBeMarked(field, index)
              }"
            >
              <slot :name="field" :value="path(field.split('.'), data)" :type="type" :field :index>
                {{ isNil(type) ? path(field.split('.'), data) || '-' : getFormattedData(data, field, type) }}
              </slot>
            </div>
          </template>
        </Column>

        <template #empty>{{ $t('table.empty') }}</template>
      </DataTable>

      <slot name="addRow" />
    </template>
  </Card>
</template>

<style lang="scss">
.p-datatable .p-column-header-content {
  width: max-content;
}
</style>
