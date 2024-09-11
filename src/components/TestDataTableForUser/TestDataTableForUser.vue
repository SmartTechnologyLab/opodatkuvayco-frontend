<script setup lang="ts">
import DataTable from '@/components/common/DataTable/DataTable.vue'
import { resultHeaders } from '@/components/common/DataTable/constants'
import { getDeal, type Deal } from '@/components/common/DataTable/mocks'
import type { DataTableCellEditCompleteEvent } from 'primevue/datatable'
import { assocPath, difference, isEmpty } from 'ramda'
import { computed, onUnmounted, ref, watch } from 'vue'
import {
  currencyOptions,
  notEditableColumns as notEditableColumnsLargeTable,
  TableSize,
  tableSizeOptions
} from '@/components/TestDataTableForUser/common/constants'
import { useI18n } from 'vue-i18n'
import { getCurrencyExchange } from '@/api/getCurrencyExchange'
import UiButton from '@/components/common/UiButton/UiButton.vue'
import { Currency } from '@/constants/currencies'
import UiSelectButton from '@/components/common/UiSelectButton/UiSelectButton.vue'
import { Icons } from '@/components/common/UiButton/constants'
import type { Currencies } from '@/components/common/DataTable/types'
import type { TableSizes } from '@/components/TestDataTableForUser/common/types'
import { groupAndSumByTicker, recalculateDeal, updatedDealRates } from '@/components/TestDataTableForUser/helpers'
import { flattenedEntries } from '@/helpers/flattenedEntries'

const TIMEOUT_MS = 3000

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

const selectedCurrency = ref<Currencies>(Currency.USD)

const selectedTableSize = ref<TableSizes>(TableSize.LG)

const addBtnText = ref(t('table.btnAddRow'))

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

const onCellEditComplete = async (event: DataTableCellEditCompleteEvent) => {
  const { newValue, field, index, newData } = event

  if (newValue) {
    if (field === 'purchase.date') {
      const { rate } = await getCurrencyExchange(selectedCurrency.value, newValue)
      table.value.data[index].purchase.rate = rate
    }

    if (field === 'sale.date') {
      const { rate } = await getCurrencyExchange(selectedCurrency.value, newValue)
      table.value.data[index].sale.rate = rate
    }

    const fieldPath = field.split('.')
    const updatedRow = assocPath(fieldPath, newValue, newData)

    const recalculatedDeal = recalculateDeal(updatedRow)

    checkDifference(recalculatedDeal, index)

    table.value.data[index] = recalculatedDeal
  }
}

const handleAddRow = () => {
  if (table.value.data.length < 8) {
    const newDeal = getDeal()
    table.value.data.push(newDeal)
  }
}

const handleDeleteRow = (rowIndex: number) => {
  table.value.data = table.value.data.filter((_, index) => index !== rowIndex)
}

watch(
  () => table.value.data.length < 8,
  () => (addBtnText.value = t('table.btnYourLimitLeft'))
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
  <DataTable
    v-if="selectedTableSize === TableSize.LG"
    :high-lighted-cells="highlightedCells"
    class="data-table"
    :table
    @onCellEdit="onCellEditComplete($event)"
    :notEditableColumns
    edit-mode="cell"
    :currency="selectedCurrency"
    stripedRows
    removableSort
    rowHover
    scrollable
  >
    <template #header>
      <div class="data-table__header">
        <h1 class="data-table__title">{{ t('table.title') }}</h1>
        <UiSelectButton v-model="selectedCurrency" :options="currencyOptions" :allowEmpty="false" />
        <UiSelectButton v-model="selectedTableSize" :options="tableSizeOptions" :allowEmpty="false" />
      </div>
    </template>

    <template #deleteRow="{ index }">
      <UiButton @click="handleDeleteRow(index)" class="data-table__delete-btn" outlined :icon="Icons.DELETE" />
    </template>

    <template #addRow>
      <UiButton @click="handleAddRow" class="data-table__add-btn" :label="addBtnText" :icon="Icons.PLUS" />
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
        <h1 class="data-table__title">{{ t('table.title') }}</h1>
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

  &__delete-btn {
    display: flex;
    justify-content: center;
    padding-inline: 10px;
  }
}

:deep() {
  .data-table__marked-cell {
    transition: color 1.2s ease-in;
    color: $highlighted-cell-color;
  }

  .data-table__unmarked-cell {
    transition: color 0.9s ease-in-out;
    color: $main-text-color;
  }
}
</style>
