<script setup lang="ts">
import DataTable from '@/components/common/DataTable/DataTable.vue'
import { FormatType } from '@/components/common/DataTable/constants'
import type { Dividend, TableHeaders } from '@/components/common/DataTable/types'

// TODO: форма декларування дивідендів відрізняється від Ф1, тому кнопка "Копіювати для Ф1" тут не додається.

const props = defineProps<{
  data: Dividend[]
}>()

const headers: TableHeaders[] = [
  { header: 'Тікер', field: 'ticker', sortable: true },
  { header: 'Сума в гривнях', field: 'amountUah', type: FormatType.CurrencyUAH, sortable: true }
]

const notEditableColumns = headers.map((h) => h.field)

const aggregatedData = Object.values(
  props.data.reduce<Record<string, Dividend>>((acc, item) => {
    if (acc[item.ticker]) {
      acc[item.ticker] = {
        ...acc[item.ticker],
        amountUah: acc[item.ticker].amountUah + item.amountUah
      }
    } else {
      acc[item.ticker] = { ...item }
    }
    return acc
  }, {})
)

const table = {
  headers,
  data: aggregatedData
}
</script>

<template>
  <div class="overflow-x-auto border border-gray-700 rounded-lg">
    <DataTable
      :table="table"
      :notEditableColumns="notEditableColumns"
      :showCopyF1="false"
      class="data-table"
      stripedRows
      removableSort
      rowHover
      scrollable
    />
  </div>
</template>

<style scoped lang="scss">
.data-table {
  min-width: 40vw;
  max-width: 90vw;
}
</style>
