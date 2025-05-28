<script setup lang="ts">
import DataTable, { type DataTableCellEditCompleteEvent } from 'primevue/datatable'
import Column from 'primevue/column'
// import Card from 'primevue/card'
import { isNil, path } from 'ramda'
import { useI18n } from 'vue-i18n'
import { computed, useAttrs, useSlots, type Ref } from 'vue'
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

const currencyType = computed(() => currenciesName[props.currency as Currencies])

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

const isColumnsEditable = (notEditableColumns: string[] | undefined, field: string) => {
  return !notEditableColumns?.includes(field)
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

const maxDate = new Date()
</script>

<template>
  <div class="data-table rounded-lg shadow-xl bg-gray-900">
    <div v-if="$slots.header" class="data-table__header bg-gray-800 p-4 rounded-t-lg">
      <slot name="header" />
    </div>

    <div class="data-table__content">
      <DataTable
        v-bind="{ ...attrs }"
        :value="table.data"
        @cell-edit-complete="$emit('onCellEdit', $event)"
        :editMode
        class="data-table__table"
        :scrollable="true"
        :scrollHeight="'flex'"
        :showGridlines="true"
      >
        <Column v-if="slots.deleteRow">
          <template #body="{ index }">
            <slot name="deleteRow" :index="index" />
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

          <template #editor="{ data, field }" v-if="isColumnsEditable(notEditableColumns, field)">
            <template v-if="calendarFields.includes(field)">
              <UiCalendar v-model="data[field]" :dateFormat="DateFormat.DOTTED" :maxDate />
            </template>

            <template v-else-if="currencyFields.includes(field)">
              <UiNumberInput v-model="data[field]" mode="currency" :currency="currencyType" />
            </template>

            <template v-else-if="numberFields.includes(field)">
              <UiNumberInput v-model="data[field]" />
            </template>

            <template v-else>
              <UiInput v-model="data[field]" />
            </template>
          </template>
        </Column>

        <template #empty>
          <div class="text-gray-400 py-4 text-center">{{ $t('table.empty') }}</div>
        </template>
      </DataTable>

      <div v-if="$slots.addRow" class="data-table__footer mt-4">
        <slot name="addRow" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.data-table {
  // обгортка таблиці
  :deep(.p-datatable-wrapper) {
    overflow-x: auto;
    border: 1px solid #374151; // border-gray-700
    border-radius: 0.5rem; // rounded-lg
  }

  // сам елемент <table>
  :deep(table) {
    width: 100%;
    border-collapse: collapse;
  }

  :deep(.p-sortable-column-icon) {
    width: 10px;
    vertical-align: text-bottom;
  }

  // заголовки
  :deep(.p-datatable-thead > tr > th) {
    background-color: #1f2937; // bg-gray-800
    color: #9ca3af; // text-gray-400
    padding: 0.75rem 1.5rem; // py-3 px-6
    font-size: 0.75rem; // text-xs
    text-transform: uppercase;
    letter-spacing: 0.05em; // tracking-wider
    border-bottom: 1px solid #374151; // divide-gray-700
  }

  // рядки з даними
  :deep(.p-datatable-tbody > tr) {
    background-color: #111827; // bg-gray-900
    border-bottom: 1px solid #27272a; // divide-gray-800
  }
  :deep(.p-datatable-tbody > tr:hover) {
    background-color: #1f2937; // bg-gray-800 on hover
  }

  // клітинки
  :deep(.p-datatable-tbody > tr > td) {
    padding: 0.75rem 1.5rem; // py-3 px-6
    color: #d1d5db; // text-gray-300
    font-size: 0.875rem; // text-sm
    white-space: nowrap;
  }

  // порожній стан
  :deep(.p-datatable-emptymessage td) {
    text-align: center;
    color: #9ca3af; // text-gray-400
    padding: 1rem;
  }

  // пагінація (якщо використовуєте)
  :deep(.p-paginator) {
    background-color: #1f2937; // bg-gray-800
    color: #d1d5db; // text-gray-300
    border-top: 1px solid #374151; // border-gray-700
  }
}
</style>
