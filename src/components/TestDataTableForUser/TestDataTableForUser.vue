<script setup lang="ts">
import DataTable from '@/components/common/DataTable/DataTable.vue'
import { resultHeaders } from '@/components/common/DataTable/constants'
import { getDeal } from '@/components/common/DataTable/mocks'
import type { DataTableCellEditCompleteEvent } from 'primevue/datatable'
import { assocPath } from 'ramda'
import { computed, ref, watch } from 'vue'
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
import { groupAndSumByTicker, recalculateVariables, updateDealRates } from '@/components/TestDataTableForUser/helpers'

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

const originalData = ref([getDeal(rowData.value), getDeal(), getDeal(), getDeal(), getDeal()])

const headers = computed(() => {
  if (selectedTableSize.value === TableSize.LG) {
    return resultHeaders
  }
  return resultHeaders.filter((header) => header.size?.includes(TableSize.SM))
})

const table = ref({
  headers: headers.value,
  data: [...originalData.value]
})

const notEditableColumns = computed(() => {
  if (selectedTableSize.value === TableSize.LG) {
    return notEditableColumnsLargeTable
  }

  return headers.value.map((header) => header.field)
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

const handleAddRow = () => {
  if (originalData.value.length < 8) {
    const newDeal = getDeal()
    originalData.value = [...originalData.value, newDeal]
    table.value.data = [...table.value.data, newDeal]
  }
}

const handleDeleteRow = (rowIndex: number) => {
  originalData.value = originalData.value.filter((_, index) => index !== rowIndex)
  table.value.data = table.value.data.filter((_, index) => index !== rowIndex)
}

watch(
  () => table.value.data.length < 8,
  () => (addBtnText.value = t('table.btnYourLimitLeft'))
)

watch(
  () => selectedCurrency.value,
  async () => {
    await Promise.all(
      table.value.data.map((deal) => updateDealRates(deal, selectedCurrency.value, () => recalculateVariables(deal)))
    )
  }
)

watch(
  () => selectedTableSize.value,
  (newValue) => {
    table.value.headers = headers.value

    if (newValue === TableSize.SM) {
      table.value.data = groupAndSumByTicker(table.value.data)
    } else {
      table.value.data = [...originalData.value]
    }
  }
)

watch(
  () => table.value.data,
  () => {
    if (table.value.data.length && selectedTableSize.value === TableSize.LG) {
      originalData.value = [...table.value.data]
    }
  },
  {
    deep: true
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
      <UiButton @click="handleDeleteRow(index)" class="data-table__delete-btn" :outlined="true" :icon="Icons.DELETE" />
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

  &__delete-btn {
    display: flex;
    justify-content: center;
    padding-inline: 10px;
  }
}
</style>
