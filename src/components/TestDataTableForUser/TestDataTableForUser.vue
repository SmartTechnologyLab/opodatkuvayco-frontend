<script setup lang="ts">
import DataTable from '@/components/common/DataTable/DataTable.vue'
import { resultHeaders } from '@/components/common/DataTable/constants'
import { getDeal, type Deal } from '@/components/common/DataTable/mocks'
import type { DataTableCellEditCompleteEvent } from 'primevue/datatable'
import { assocPath } from 'ramda'
import { ref, watch } from 'vue'
import { notEditableColumns } from './common/notEditableColumns'
import UiButton from '../common/UiButton/UiButton.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

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

const btnContent = ref(t('table.btnAddRow'))

const onCellEditComplete = (event: DataTableCellEditCompleteEvent) => {
  let { newValue, field, index } = event

  if (newValue !== undefined && newValue !== null && newValue !== '') {
    const editedRow = table.value.data[index]

    const fieldPath = field.split('.')

    const updatedRow = assocPath(fieldPath, newValue, editedRow)

    table.value.data[index] = updatedRow

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

const handleAddRow = () => {
  table.value.data.length < 8 ? table.value.data.push(getDeal()) : null
}

watch(
  () => table.value.data.length < 8,
  () => (btnContent.value = t('table.btnYourLimitLeft'))
)
</script>

<template>
  <DataTable
    removeSortable
    sortableColumn
    :table="table"
    title="Example table"
    @onCellEdit="onCellEditComplete($event)"
    :notEditableColumns="notEditableColumns"
    edit-mode="cell"
    class="data-table"
    resizableColumns
  >
    <template #add-row>
      <UiButton @click-btn="handleAddRow" class="data-table__add-btn">
        <i class="pi pi-plus" style="color: black" v-if="table.data.length < 8" />
        {{ btnContent }}
      </UiButton>
    </template>
  </DataTable>
</template>

<style scoped lang="scss">
.data-table {
  width: 90vw;

  &__add-btn {
    margin-left: auto;
    margin-top: 1rem;

    min-width: 180px;
    max-width: 200px;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }
}
</style>
