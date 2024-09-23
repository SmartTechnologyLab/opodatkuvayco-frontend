<script setup lang="ts">
import { resultHeaders } from '@/components/common/DataTable/constants'
import { getDeal, type Deal, type DealOptions } from '@/components/common/DataTable/mocks'
import { difference, isEmpty } from 'ramda'
import { computed, onUnmounted, ref, watch } from 'vue'
import {
  notEditableColumns as notEditableColumnsLargeTable,
  TableSize,
  tableSizeOptions
} from '@/components/TestDataTableForUser/common/constants'
import { getCurrencyExchange } from '@/api/getCurrencyExchange'
import UiButton from '@/components/common/UiButton/UiButton.vue'
import { Currency } from '@/constants/currencies'
import UiSelectButton from '@/components/common/UiSelectButton/UiSelectButton.vue'
import type { Currencies } from '@/components/common/DataTable/types'
import type { TableSizes } from '@/components/TestDataTableForUser/common/types'
import { groupAndSumByTicker, recalculateDeal, updatedDealRates } from '@/components/TestDataTableForUser/helpers'
import { flattenedEntries } from '@/helpers/flattenedEntries'
import Toolbar from 'primevue/toolbar'
import EditDealDialog from '@/components/EditDealDialog/EditDealDialog.vue'
import { Icons } from '@/components/common/UiButton/constants'
import DataTable from '@/components/common/DataTable/DataTable.vue'

const TIMEOUT_MS = 3000

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

const isDialogVisible = ref(false)

const editingDeal = ref<{
  deal: Deal
  index: number | null
}>({
  deal: {} as Deal,
  index: null
})

const selectedCurrency = ref<Currencies>(Currency.USD)

const selectedTableSize = ref<TableSizes>(TableSize.LG)

const originalData = ref([getDeal(rowData.value)])

const highlightedCells = ref<Record<number, unknown[]>>({})

const timeoutHighliting = ref<NodeJS.Timeout | null>(null)

const headers = computed(() => {
  if (selectedTableSize.value === TableSize.LG) {
    return resultHeaders
  }
  return resultHeaders.filter((header) => header.size?.includes(TableSize.SM))
})

const tableData = computed(() => {
  if (selectedTableSize.value === TableSize.SM) {
    return groupAndSumByTicker(originalData.value)
  }

  return originalData.value
})

const table = ref({
  headers: headers.value,
  data: tableData.value
})

const notEditableColumns = computed(() => {
  if (selectedTableSize.value === TableSize.LG) {
    return notEditableColumnsLargeTable
  }
  return headers.value.map((header) => header.field)
})

const checkDifference = (newRow: Deal, index: number) => {
  clearTimeout(timeoutHighliting.value as NodeJS.Timeout)

  highlightedCells.value = {}
  timeoutHighliting.value = null

  const arr: Array<[number, unknown]> = difference(flattenedEntries(table.value.data[index]), flattenedEntries(newRow))

  if (!highlightedCells.value[index]) {
    highlightedCells.value[index] = []
  }

  arr.forEach(([field]) => {
    highlightedCells.value[index].push(field)
  })
}

const handleEditDeal = (deal: Deal, index: number) => {
  editingDeal.value = {
    deal,
    index
  }

  isDialogVisible.value = true
}

const handleEditeDeal = async (editedDeal: Deal, index: number) => {
  const currentDeal = table.value.data[index]

  if (editedDeal.purchase.date !== currentDeal.purchase.date) {
    const { rate } = await getCurrencyExchange(selectedCurrency.value, String(editedDeal.purchase.date))
    editedDeal.purchase.rate = rate
  }

  if (editedDeal.sale.date !== currentDeal.sale.date) {
    const { rate } = await getCurrencyExchange(selectedCurrency.value, String(editedDeal.sale.date))
    editedDeal.sale.rate = rate
  }

  const recalculatedDeal = recalculateDeal(editedDeal)

  checkDifference(recalculatedDeal, index)

  table.value.data[index] = recalculatedDeal

  isDialogVisible.value = false
  editingDeal.value = {
    deal: {} as Deal,
    index: null
  }
}

const handleAddNewDeal = async (newDeal: DealOptions) => {
  const deal = getDeal(newDeal)

  const [{ rate: purchaseRate }, { rate: saleRate }] = await Promise.all([
    getCurrencyExchange(selectedCurrency.value, String(deal.purchase.date)),
    getCurrencyExchange(selectedCurrency.value, String(deal.sale.date))
  ])

  deal.purchase.rate = purchaseRate
  deal.sale.rate = saleRate

  originalData.value.push(deal)
  isDialogVisible.value = false
}

const handleOpenEditDialog = () => {
  isDialogVisible.value = true
}

const handleDeleteRow = (rowIndex: number) => {
  table.value.data = table.value.data.filter((_, index) => index !== rowIndex)
}

const handleCloseDialog = () => {
  editingDeal.value = {
    deal: {} as Deal,
    index: null
  }
  isDialogVisible.value = false
}

watch(
  originalData,
  () => {
    table.value.data = tableData.value
  },
  {
    deep: true
  }
)

watch(selectedCurrency, async () => {
  const updatedDeals = await updatedDealRates(table.value.data, selectedCurrency.value)

  table.value.data.forEach((_, index) => {
    table.value.data[index] = updatedDeals[index]
  })
})

watch(selectedTableSize, () => {
  table.value.headers = headers.value
  table.value.data = tableData.value
})

watch(
  highlightedCells,
  () => {
    if (!isEmpty(highlightedCells.value)) {
      timeoutHighliting.value = setTimeout(() => {
        highlightedCells.value = {}
      }, TIMEOUT_MS)
    }
  },
  {
    deep: true
  }
)

onUnmounted(() => {
  clearTimeout(timeoutHighliting.value as NodeJS.Timeout)
})
</script>

<template>
  <EditDealDialog
    @submit="handleAddNewDeal"
    @edit="handleEditeDeal"
    @close="handleCloseDialog"
    :visible="isDialogVisible"
    :deal="editingDeal.deal"
    :dealIndex="editingDeal.index"
  />

  <DataTable
    v-if="selectedTableSize === TableSize.LG"
    :high-lighted-cells="highlightedCells"
    class="data-table"
    :table
    :currency="selectedCurrency"
    stripedRows
    removableSort
    rowHover
    scrollable
  >
    <template #header>
      <Toolbar class="data-table__toolbar">
        <template #start>
          <UiButton text :icon="Icons.PLUS" label="Додати" @click="handleOpenEditDialog" />
        </template>

        <template #end>
          <UiButton label="Завантажити" />
        </template>
      </Toolbar>
    </template>

    <template #editRow="{ index, data }">
      <div class="data-table__editable-wrapper">
        <UiButton @click="handleEditDeal(data, index)" text :icon="Icons.EDIT" />

        <UiButton @click="handleDeleteRow(index)" text :icon="Icons.DELETE" />
      </div>
    </template>
  </DataTable>

  <DataTable
    v-else
    :table
    :notEditableColumns
    class="data-table"
    :currency="selectedCurrency"
    stripedRows
    removableSort
    rowHover
    scrollable
  >
    <template #header>
      <div class="data-table__header">
        <UiSelectButton v-model="selectedTableSize" :options="tableSizeOptions" :allowEmpty="false" />
      </div>
    </template>
  </DataTable>
</template>

<style scoped lang="scss">
$highlighted-cell-color: #34d399;

.data-table {
  min-width: 40vw;
  max-width: 90vw;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__title {
    font-size: 2rem;
  }

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

  &__editable-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }

  &__delete-btn {
    display: flex;
    justify-content: center;
    padding-inline: 10px;
  }

  &__toolbar {
    margin: 1.5rem 1.5rem 0 1.5rem;
  }

  &__utils-buttons {
    display: flex;
    gap: 1rem;
  }

  &__header {
    width: max-content;
  }
}

.p-datatable .p-column-header-content {
  width: max-content;
}

:deep() {
  .data-table__marked-cell {
    transition: color 1.2s ease-in;
    color: $highlighted-cell-color;
  }

  .data-table__unmarked-cell {
    transition: color 0.9s ease-in-out;
  }
}
</style>
