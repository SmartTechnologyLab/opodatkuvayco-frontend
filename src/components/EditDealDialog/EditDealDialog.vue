<script setup lang="ts">
import { computed, ref, toRefs, watch } from 'vue'
import { clone } from 'ramda'
import type { Deal, DealOptions } from '@/components/common/DataTable/mocks'
import { DateFormat } from '@/components/common/UiCalendar/types'
import UiDialog from '@/components/common/UiDialog/UiDialog.vue'
import UiInput from '@/components/common/UiInput/UiInput.vue'
import UiNumberInput from '@/components/common/UiNumberInput/UiNumberInput.vue'
import UiCalendar from '@/components/common/UiCalendar/UiCalendar.vue'
import UiButton from '@/components/common/UiButton/UiButton.vue'

const props = defineProps<{
  visible: boolean
  deal: Deal
  dealIndex: number | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submit', deal: DealOptions): void
  (e: 'edit', deal: Deal, index: number): void
}>()

const { visible, deal, dealIndex } = toRefs(props)

const editingDeal = ref<Deal>({ ...deal.value })

const newDeal = ref<DealOptions>({} as DealOptions)

const title = computed(() => (dealIndex.value !== null ? 'Редагування угоди' : 'Нова угода'))

const isEditDealForm = computed(() => dealIndex.value !== null)

const isConfirmButtonDisabled = computed(() => {
  if (!isEditDealForm.value) {
    return (
      !newDeal.value.ticker ||
      !newDeal.value.quantity ||
      !newDeal.value.purchasePrice ||
      !newDeal.value.salePrice ||
      !newDeal.value.purchaseDate ||
      !newDeal.value.saleDate ||
      !newDeal.value.purchaseRate ||
      !newDeal.value.saleRate
    )
  }

  return Object.values(editingDeal.value).some((value) => !value)
})

watch(visible, () => {
  if (!visible.value) {
    newDeal.value = {} as DealOptions
  }
})

watch(deal, (newDeal) => {
  editingDeal.value = clone(newDeal)
})
</script>

<template>
  <UiDialog :visible :header="title" @update:visible="emit('close')">
    <div v-if="isEditDealForm">
      <div class="input-group-wrapper">
        <div class="input-wrapper">
          <label for="ticker">Тікер</label>
          <UiInput id="ticker" v-model="editingDeal.ticker" />
        </div>
        <div class="input-wrapper">
          <label for="quantity">Кількість</label>
          <UiNumberInput id="quantity" v-model="editingDeal.quantity" />
        </div>
      </div>

      <div class="input-group-wrapper">
        <div class="input-wrapper">
          <label for="purchasePrice">Ціна придбання</label>
          <UiNumberInput id="purchasePrice" v-model="editingDeal.purchase.price" />
        </div>
        <div class="input-wrapper">
          <label for="salePrice">Ціна продажу</label>
          <UiNumberInput id="salePrice" v-model="editingDeal.sale.price" />
        </div>
      </div>

      <div class="input-group-wrapper">
        <div class="input-wrapper">
          <label for="purchaseDate">Дата придбання</label>
          <UiCalendar id="purchaseDate" v-model="editingDeal.purchase.date" :dateFormat="DateFormat.DOTTED" />
        </div>
        <div class="input-wrapper">
          <label for="saleDate">Дата продажу</label>
          <UiCalendar id="saleDate" v-model="editingDeal.sale.date" :dateFormat="DateFormat.DOTTED" />
        </div>
      </div>

      <div class="input-group-wrapper">
        <div class="input-wrapper">
          <label for="purchaseRate">Курс придбання</label>
          <UiNumberInput id="purchaseRate" v-model="editingDeal.purchase.rate" />
        </div>
        <div class="input-wrapper">
          <label for="saleRate">Курс продажу</label>
          <UiNumberInput id="saleRate" v-model="editingDeal.sale.rate" />
        </div>
      </div>
    </div>

    <div v-else>
      <div class="input-group-wrapper">
        <div class="input-wrapper">
          <label for="ticker">Тікер</label>
          <UiInput id="ticker" v-model="newDeal.ticker" />
        </div>

        <div class="input-wrapper">
          <label for="quantity">Кількість</label>
          <UiNumberInput id="quantity" v-model="newDeal.quantity" />
        </div>
      </div>

      <div class="input-group-wrapper">
        <div class="input-wrapper">
          <label for="purchasePrice">Ціна придбання</label>
          <UiNumberInput id="purchasePrice" v-model="newDeal.purchasePrice" />
        </div>

        <div class="input-wrapper">
          <label for="salePrice">Ціна продажу</label>
          <UiNumberInput id="salePrice" v-model="newDeal.salePrice" />
        </div>
      </div>

      <div class="input-group-wrapper">
        <div class="input-wrapper">
          <label for="saleDate">Дата продажу</label>
          <UiCalendar id="saleDate" v-model="newDeal.saleDate" />
        </div>

        <div class="input-wrapper">
          <label for="purchaseDate">Дата придбання</label>
          <UiCalendar id="purchaseDate" v-model="newDeal.purchaseDate" />
        </div>
      </div>

      <div class="input-group-wrapper">
        <div class="input-wrapper">
          <label for="purchaseRate">Курс придбання</label>
          <UiNumberInput id="purchaseRate" v-model="newDeal.purchaseRate" />
        </div>

        <div class="input-wrapper">
          <label for="saleRate">Курс продажу</label>
          <UiNumberInput id="saleRate" v-model="newDeal.saleRate" />
        </div>
      </div>
    </div>

    <template #footer>
      <UiButton @click="emit('close')">Відмінити</UiButton>

      <UiButton
        v-if="isEditDealForm"
        :disabled="isConfirmButtonDisabled"
        @click="emit('edit', editingDeal, dealIndex as number)"
        >Підтвердити Зміну</UiButton
      >

      <UiButton v-else :disabled="isConfirmButtonDisabled" @click="emit('submit', deal)">Додати</UiButton>
    </template>
  </UiDialog>
</template>

<style lang="scss">
.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.input-group-wrapper {
  display: flex;
  gap: 1rem;

  margin-bottom: 1rem;
}

.p-dialog-footer {
  display: flex;
  justify-content: space-between;
}
</style>
