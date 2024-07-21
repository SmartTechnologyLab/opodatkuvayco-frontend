<script setup lang="ts">
import DataTable from '@/components/common/DataTable/DataTable.vue'
import { resultHeaders } from '@/components/common/DataTable/constants'
import { getDeal, type Deal } from '@/components/common/DataTable/mocks'
import type { DataTableCellEditCompleteEvent } from 'primevue/datatable'
import { assocPath } from 'ramda'
import { computed, ref, watch } from 'vue'
import {
  currencyOptions,
  notEditableColumns,
  TableSize,
  tableSizeOptions
} from '@/components/TestDataTableForUser/common/constants'
import { useI18n } from 'vue-i18n'
import { getCurrencyExchange } from '@/api/getCurrencyExchange'
import UiButton from '@/components/common/UiButton/UiButton.vue'
import { Currency } from '@/constants/currencies'
import UiSelectButton from '@/components/common/UiSelectButton/UiSelectButton.vue'
import { Icons } from '../common/UiButton/constants'

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

const selectedCurrency = ref<Currency>(Currency.USD)

const selectedTableSize = ref<TableSize>(TableSize.LG)

const addBtnText = ref(t('table.btnAddRow'))

const headers = computed(() => {
  if (selectedTableSize.value === TableSize.LG) {
    return resultHeaders
  }

  return resultHeaders.filter((header) => header.size?.includes(TableSize.SM))
})

const table = ref({
  headers: headers.value,
  data: [getDeal(rowData.value), getDeal(), getDeal(), getDeal(), getDeal()]
})

const onCellEditComplete = async (event: DataTableCellEditCompleteEvent) => {
  let { newValue, field, index } = event

  if (newValue) {
    if (field === 'purchase.date') {
      const exchangeRate = await getCurrencyExchange(selectedCurrency.value, newValue)
      table.value.data[index].purchase.rate = exchangeRate.rate
    }

    if (field === 'sale.date') {
      const exchangeRate = await getCurrencyExchange(selectedCurrency.value, newValue)
      table.value.data[index].sale.rate = exchangeRate.rate
    }

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

const updateDealRates = async (deal: Deal) => {
  const [purchase, sale] = await Promise.all([
    getCurrencyExchange(selectedCurrency.value, String(deal.purchase.date)),
    getCurrencyExchange(selectedCurrency.value, String(deal.sale.date))
  ])

  deal.purchase.rate = purchase.rate
  deal.sale.rate = sale.rate

  recalculateVariables(deal)
}

const handleDeleteRow = (rowIndex: number) => {
  table.value.data = table.value.data.filter((_, index) => index !== rowIndex)
}

watch(
  () => table.value.data.length < 8,
  () => (addBtnText.value = t('table.btnYourLimitLeft'))
)

watch(
  () => selectedCurrency.value,
  async () => {
    await Promise.all(table.value.data.map((deal) => updateDealRates(deal)))
  }
)

const groupByTicker = (deals: Deal[]) => {
  const grouped = deals.reduce(
    (acc, deal) => {
      if (!acc[deal.ticker]) {
        acc[deal.ticker] = { ...deal }
      } else {
        acc[deal.ticker].sale.uah += deal.sale.uah
        acc[deal.ticker].purchase.uah += deal.purchase.uah
        acc[deal.ticker].total += deal.total
      }

      return acc
    },
    {} as Record<string, Deal>
  )

  return Object.values(grouped)
}

watch(
  () => selectedTableSize.value,
  (newValue) => {
    table.value.headers = headers.value

    if (newValue === TableSize.SM) {
      const groupedTableData = groupByTicker(table.value.data)

      table.value.data = groupedTableData
    }
  }
)
</script>

<template>
  <DataTable
    v-if="selectedTableSize === TableSize.LG"
    :table="table"
    @onCellEdit="onCellEditComplete($event)"
    :notEditableColumns="notEditableColumns"
    edit-mode="cell"
    class="data-table"
    :currency="selectedCurrency"
  >
    <template #header>
      <div class="data-table__header">
        <h1 class="data-table__title">{{ t('table.title') }}</h1>
        <UiSelectButton v-model="selectedTableSize" :options="tableSizeOptions" :allow-empty="false" />
        <UiSelectButton v-model="selectedCurrency" :options="currencyOptions" :allow-empty="false" />
      </div>
    </template>

    <template #deleteRow="{ index }">
      <UiButton @click="handleDeleteRow(index)" :outlined="true" :icon="Icons.DELETE"> </UiButton>
    </template>

    <template #addRow>
      <UiButton @click="handleAddRow" class="data-table__add-btn">
        <i class="pi pi-plus" style="color: black" v-if="table.data.length < 8" />
        {{ addBtnText }}
      </UiButton>
    </template>
  </DataTable>

  <DataTable
    v-else
    :table="table"
    :notEditableColumns="notEditableColumns"
    edit-mode="cell"
    class="data-table"
    :currency="selectedCurrency"
  >
    <template #header>
      <div class="data-table__header">
        <h1 class="data-table__title">{{ t('table.title') }}</h1>
        <UiSelectButton v-model="selectedTableSize" :options="tableSizeOptions" :allow-empty="false" />
        <UiSelectButton v-model="selectedCurrency" :options="currencyOptions" :allow-empty="false" />
      </div>
    </template>

    <template #deleteRow="{ index }">
      <UiButton @click="handleDeleteRow(index)" :outlined="true" :icon="Icons.DELETE"> </UiButton>
    </template>
  </DataTable>
</template>

<style scoped lang="scss">
.data-table {
  width: 90vw;

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
}
</style>
