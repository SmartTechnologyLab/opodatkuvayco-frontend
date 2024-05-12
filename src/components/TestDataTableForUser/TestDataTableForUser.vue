<script setup lang="ts">
import DataTable from '@/components/common/DataTable/DataTable.vue'
import { resultHeaders } from '@/components/common/DataTable/constants'
import { getDeal, type Deal } from '@/components/common/DataTable/mocks'
import type { DataTableCellEditCompleteEvent } from 'primevue/datatable'
import { assocPath } from 'ramda'
import { ref } from 'vue'
import { notEditableColumns } from './common/notEditableColumns'

const rowData = ref({
  ticker: 'DAL',
  quantity: 2,
  purchaseRate: 29.2549,
  purchasePrice: 28.88,
  purchaseCommission: 1.49,
  saleRate: 36.5686,
  salePrice: 42.42,
  saleCommission: 1.62
})

const table = ref({
  headers: resultHeaders,
  data: [getDeal(rowData.value), getDeal(), getDeal(), getDeal(), getDeal()]
})

const onCellEditComplete = (event: DataTableCellEditCompleteEvent) => {
  let { data, newValue, field } = event

  const rowIndex = table.value.data.findIndex((row) => row === data)

  if (rowIndex !== -1) {
    const editedRow = table.value.data[rowIndex]

    const fieldPath = field.split('.')

    const updatedRow = assocPath(fieldPath, newValue, editedRow)

    table.value.data[rowIndex] = updatedRow

    recalculateVariables(updatedRow)
  }
}

const recalculateVariables = (deal: Deal) => {
  deal.purchase.sum = deal.purchase.price * deal.quantity
  deal.sale.sum = deal.sale.price * deal.quantity
  deal.purchase.uah =
    (deal.purchase.sum + deal.purchase.commission) * deal.purchase.rate + deal.sale.commission * deal.sale.rate
  deal.sale.uah = deal.sale.sum * deal.sale.rate
  deal.total = deal.sale.uah - deal.purchase.uah
  deal.percent = deal.sale.uah / deal.purchase.uah - 1
}
</script>

<template>
  <DataTable
    removeSortable
    sortableColumn
    :table="table"
    title="Example table"
    @onCellEditComplete="onCellEditComplete($event)"
    :notEditableColumns
  >
  </DataTable>
</template>
