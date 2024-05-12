<script setup lang="ts">
import DataTable, { type DataTableCellEditCompleteEvent } from 'primevue/datatable'
import Column from 'primevue/column'
import Card from 'primevue/card'
import { path } from 'ramda'
import { useI18n } from 'vue-i18n'
import { type Ref } from 'vue'
import { type Deal } from '@/components/common/DataTable/mocks'
import { FormatType, type Table } from '@/components/common/DataTable/types'
import { isNil } from 'ramda'
import UiInput from '@/components/common/UiInput/UiInput.vue'
import Calendar from 'primevue/calendar'
import { calendarFields, currencyFields, numberFields } from '@/components/common/DataTable/constants/fieldsList'
import UiNumberInput from '../UiNumberInput/UiNumberInput.vue'

defineProps<{
  table: Table
  title?: string
  sortableColumn?: boolean
  removeSortable?: boolean
  notEditableColumns?: string[]
}>()

defineEmits<{
  (e: 'onCellEditComplete', event: DataTableCellEditCompleteEvent): void
}>()

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

const isFieldEditable = (notEditableColumns: string[] | undefined, field: string) => {
  return !notEditableColumns?.includes(field)
}
</script>

<template>
  <Card>
    <template #title v-if="title">
      {{ $t(title) }}
    </template>

    <template #content>
      <DataTable
        :value="table.data"
        size="small"
        :removableSort="removeSortable"
        @cell-edit-complete="$emit('onCellEditComplete', $event)"
        editMode="cell"
      >
        <Column
          v-for="{ field, header, type } in table.headers"
          :sortable="sortableColumn"
          :key="field"
          :field
          :header="$t(header)"
        >
          <template #body="{ data, field }">
            <slot :name="field" :value="path(field.split('.'), data)" :type="type">
              {{ isNil(type) ? path(field.split('.'), data) || '-' : getFormattedData(data, field, type) }}
            </slot>
          </template>

          <template #editor="{ data, field }" v-if="isFieldEditable(notEditableColumns, field)">
            <template v-if="calendarFields.includes(field)">
              <Calendar v-model="data[field]" dateFormat="dd.mm.yy" />
            </template>
            <template v-else-if="currencyFields.includes(field)">
              <UiNumberInput v-model="data[field]" mode="currency" currency="USD" />
            </template>
            <template v-else-if="numberFields.includes(field)">
              <UiNumberInput v-model="data[field]" autofocus />
            </template>

            <template v-else>
              <UiInput v-model="data[field]" />
            </template>
          </template>
        </Column>

        <template #empty>{{ $t('table.empty') }}</template>
      </DataTable>
    </template>
  </Card>
</template>

<style scoped></style>
