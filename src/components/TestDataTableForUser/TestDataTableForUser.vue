<script setup lang="ts">
import DataTable from '@/components/common/DataTable/DataTable.vue'
import { resultHeaders } from '@/components/common/DataTable/constants'
import { getDeal, type Deal } from '@/components/common/DataTable/mocks'
import type { DataTableCellEditCompleteEvent } from 'primevue/datatable'
import { assocPath } from 'ramda'
import { ref, watch } from 'vue'
import { notEditableColumns } from './common/notEditableColumns'
import { useI18n } from 'vue-i18n'
import { getCurrencyExchange } from '@/api/getCurrencyExchange'
import UiButton from '@/components/common/UiButton/UiButton.vue'
import SelectButton from 'primevue/selectbutton'
import { Currency } from '../common/UiNumberInput/types'

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

const currencies = ref<string[]>(Object.values(Currency).filter((currency) => currency !== Currency.UAH))

const selectedCurrency = ref(Currency.USD)

const btnContent = ref(t('table.btnAddRow'))

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

watch(
  () => table.value.data.length < 8,
  () => (btnContent.value = t('table.btnYourLimitLeft'))
)

table.value.data.forEach((deal) => {
  watch(
    () => selectedCurrency.value,
    async () => {
      const [purchase, sale] = await Promise.all([
        getCurrencyExchange(selectedCurrency.value, String(deal.purchase.date)),
        getCurrencyExchange(selectedCurrency.value, String(deal.sale.date))
      ])

      deal.purchase.rate = purchase.rate
      deal.sale.rate = sale.rate

      recalculateVariables(deal)
    }
  )
})
</script>

<template>
  <DataTable
    :table="table"
    @onCellEdit="onCellEditComplete($event)"
    :notEditableColumns="notEditableColumns"
    edit-mode="cell"
    class="data-table"
    resizableColumns
    :currency="selectedCurrency"
  >
    <template #header>
      <div class="data-table__header">
        <h1 class="data-table__title">{{ t('table.title') }}</h1>
        <SelectButton v-model="selectedCurrency" :options="currencies" :allow-empty="false" />
      </div>
    </template>

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
