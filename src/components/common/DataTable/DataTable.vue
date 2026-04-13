<script setup lang="ts">
import DataTable, { type DataTableCellEditCompleteEvent } from 'primevue/datatable'
import Column from 'primevue/column'
// import Card from 'primevue/card'
import { isNil, path } from 'ramda'
import { useI18n } from 'vue-i18n'
import { computed, ref, useAttrs, useSlots, type Ref } from 'vue'
import { type Deal } from '@/components/common/DataTable/mocks'
import type { Currencies, Table } from '@/components/common/DataTable/types'
import UiInput from '@/components/common/UiInput/UiInput.vue'
import { calendarFields, currencyFields, numberFields } from '@/components/common/DataTable/constants/fieldsList'
import UiNumberInput from '../UiNumberInput/UiNumberInput.vue'
import UiCalendar from '../UiCalendar/UiCalendar.vue'
import { DateFormat } from '../UiCalendar/types'
import { Currency, currenciesSymbols } from '@/constants/currencies'
import { currenciesName, FormatType, dynamicCurrencies } from '@/components/common/DataTable/constants'

const props = withDefaults(
  defineProps<{
    table: Table
    notEditableColumns?: string[]
    editMode?: 'cell' | 'row' | undefined
    currency?: Currency
    highLightedCells?: Record<number, unknown[]>
    showCopyF1?: boolean
  }>(),
  { showCopyF1: true }
)

const showCopyF1Button = computed(() => props.showCopyF1)

defineEmits<{
  (e: 'onCellEdit', event: DataTableCellEditCompleteEvent): void
}>()

const { d, n } = useI18n()

const attrs = useAttrs()

const slots = useSlots()

const currencyType = computed(() => currenciesName[props.currency as Currencies])

const getFormattedData = (data: Ref<Deal[]>, field: string, type?: FormatType) => {
  const value = path(field.split('.'), data)

  const [formatted] = [
    type === FormatType.Date && d(value),
    type === FormatType.Number && n(value),
    type === FormatType.CurrencyUSD && n(value, { style: 'currency', currency: props.currency || Currency.EUR }),
    type === FormatType.CurrencyUAH && n(value, { style: 'currency', currency: Currency.UAH }),
    type === FormatType.Percent && n(value, 'percent'),
    value
  ].filter(Boolean)

  return formatted
}

const isColumnsEditable = (notEditableColumns: string[] | undefined, field: string) => {
  return !notEditableColumns?.includes(field)
}

const tableCurrency = (currency: FormatType) => {
  if (currency === FormatType.CurrencyUAH) {
    return currenciesSymbols[Currency.UAH]
  }

  return dynamicCurrencies.includes(currency) ? currenciesSymbols[props.currency as Currency] : ''
}

const isCellShouldBeMarked = (field: string, index: number) => {
  return props?.highLightedCells && props?.highLightedCells[index] && props.highLightedCells[index].includes(field)
}

const maxDate = new Date()

const COPY_BUTTON_DEFAULT_LABEL = 'Копіювати для Ф1'
const COPY_BUTTON_SUCCESS_LABEL = 'Скопійовано ✓'
const copyButtonLabel = ref(COPY_BUTTON_DEFAULT_LABEL)

const hasData = computed(() => Array.isArray(props.table?.data) && props.table.data.length > 0)

const formatUahAmount = (value: number): string => {
  const fixed = Math.abs(value).toFixed(2)
  return value < 0 ? `-${fixed}` : fixed
}

type F1Row = { ticker?: unknown; sale?: { uah?: unknown }; purchase?: { uah?: unknown } }

const buildF1Tsv = (): string => {
  const lines: string[] = []
  for (const row of props.table.data as F1Row[]) {
    const saleUah = row?.sale?.uah
    const purchaseUah = row?.purchase?.uah
    const ticker = row?.ticker
    if (ticker == null || saleUah == null || purchaseUah == null) continue
    lines.push(`2\t${ticker}\t${formatUahAmount(Number(saleUah))}\t${formatUahAmount(Number(purchaseUah))}`)
  }
  return lines.join('\n')
}

const fallbackCopy = (text: string): boolean => {
  try {
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(textarea)
    return ok
  } catch {
    return false
  }
}

const handleCopyF1 = async () => {
  const tsv = buildF1Tsv()
  if (!tsv) return
  let copied = false
  try {
    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      await navigator.clipboard.writeText(tsv)
      copied = true
    } else {
      copied = fallbackCopy(tsv)
    }
  } catch {
    copied = fallbackCopy(tsv)
  }
  if (copied) {
    copyButtonLabel.value = COPY_BUTTON_SUCCESS_LABEL
    setTimeout(() => {
      copyButtonLabel.value = COPY_BUTTON_DEFAULT_LABEL
    }, 2000)
  }
}
</script>

<template>
  <div class="data-table rounded-lg shadow-xl bg-gray-900">
    <div v-if="$slots.header" class="data-table__header bg-gray-800 p-4 rounded-t-lg">
      <slot name="header" />
    </div>

    <div
      v-if="hasData && showCopyF1Button"
      class="data-table__toolbar flex justify-end items-center gap-2 p-3 bg-gray-800 border-b border-gray-700"
    >
      <button
        type="button"
        class="data-table__copy-f1-btn inline-flex items-center gap-2 px-4 py-2 rounded-md font-medium text-sm bg-[#14ffa5] text-gray-900 hover:brightness-110 transition"
        @click="handleCopyF1"
      >
        {{ copyButtonLabel }}
      </button>

      <div class="data-table__tooltip-wrap">
        <span class="data-table__tooltip-icon" aria-label="Підказка" tabindex="0">?</span>

        <div class="data-table__tooltip" role="tooltip">
          Перед вставкою в Кабінеті платника податків поставте курсор у
          <strong>2-гу колонку</strong> «Вид інвестиційних активів*» у додатку Ф1 — тоді дані розподіляться по колонках
          правильно.
        </div>
      </div>
    </div>

    <div class="data-table__content">
      <DataTable
        v-bind="{ ...attrs }"
        :value="table.data"
        @cell-edit-complete="$emit('onCellEdit', $event)"
        :editMode
        class="data-table__table"
        :scrollable="true"
        :scrollHeight="'flex'"
        :showGridlines="true"
      >
        <Column v-if="slots.deleteRow">
          <template #body="{ index }">
            <slot name="deleteRow" :index="index" />
          </template>
        </Column>

        <Column
          v-for="{ field, header, type, sortable } in table.headers"
          :sortable
          :key="field"
          :field
          :header="`${$t(header)} ${tableCurrency(type as FormatType)}`"
        >
          <template #body="{ data, field: rawField, index }">
            <div
              :key="index"
              :class="{
                'data-table__marked-cell': isCellShouldBeMarked(String(rawField), index),
                'data-table__unmarked-cell': !isCellShouldBeMarked(String(rawField), index)
              }"
            >
              <slot
                :name="String(rawField)"
                :value="path(String(rawField).split('.'), data)"
                :type="type"
                :field="String(rawField)"
                :index
              >
                {{
                  isNil(type)
                    ? path(String(rawField).split('.'), data) || '-'
                    : getFormattedData(data, String(rawField), type)
                }}
              </slot>
            </div>
          </template>

          <template #editor="{ data, field }" v-if="isColumnsEditable(notEditableColumns, field)">
            <template v-if="calendarFields.includes(field)">
              <UiCalendar v-model="data[field]" :dateFormat="DateFormat.DOTTED" :maxDate />
            </template>

            <template v-else-if="currencyFields.includes(field)">
              <UiNumberInput v-model="data[field]" mode="currency" :currency="currencyType" />
            </template>

            <template v-else-if="numberFields.includes(field)">
              <UiNumberInput v-model="data[field]" />
            </template>

            <template v-else>
              <UiInput v-model="data[field]" />
            </template>
          </template>
        </Column>

        <template #empty>
          <div class="text-gray-400 py-4 text-center">{{ $t('table.empty') }}</div>
        </template>
      </DataTable>

      <div v-if="$slots.addRow" class="data-table__footer mt-4">
        <slot name="addRow" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.data-table__tooltip-wrap {
  position: relative;
  display: inline-flex;

  &:hover .data-table__tooltip,
  .data-table__tooltip-icon:focus + .data-table__tooltip {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
}

.data-table__tooltip-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  border: 1px solid #14ffa5;
  color: #14ffa5;
  font-size: 0.75rem;
  font-weight: 700;
  cursor: help;
  user-select: none;
  transition: background-color 0.15s;

  &:hover,
  &:focus {
    background-color: rgba(20, 255, 165, 0.15);
    outline: none;
  }
}

.data-table__tooltip {
  position: absolute;
  right: 0;
  top: calc(100% + 0.5rem);
  z-index: 20;
  width: max-content;
  max-width: 18rem;
  padding: 0.625rem 0.75rem;
  background-color: #111827;
  border: 1px solid #14ffa5;
  border-radius: 0.375rem;
  color: #e5e7eb;
  font-size: 0.75rem;
  line-height: 1.4;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-4px);
  transition:
    opacity 0.15s,
    transform 0.15s,
    visibility 0.15s;
  pointer-events: none;

  strong {
    color: #14ffa5;
  }
}

.data-table {
  // обгортка таблиці
  :deep(.p-datatable-wrapper) {
    overflow-x: auto;
    border: 1px solid #374151; // border-gray-700
    border-radius: 0.5rem; // rounded-lg
  }

  // сам елемент <table>
  :deep(table) {
    width: 100%;
    border-collapse: collapse;
  }

  :deep(.p-sortable-column-icon) {
    width: 10px;
    vertical-align: text-bottom;
  }

  // заголовки
  :deep(.p-datatable-thead > tr > th) {
    background-color: #1f2937; // bg-gray-800
    color: #9ca3af; // text-gray-400
    padding: 0.75rem 1.5rem; // py-3 px-6
    font-size: 0.75rem; // text-xs
    text-transform: uppercase;
    letter-spacing: 0.05em; // tracking-wider
    border-bottom: 1px solid #374151; // divide-gray-700
  }

  // активний стан сортування — neon-green фон, потрібен темний контрастний текст
  :deep(.p-datatable-thead > tr > th.p-datatable-sortable-column.p-datatable-column-sorted),
  :deep(.p-datatable-thead > tr > th[data-p-sorted='true']) {
    color: #14ffa5 !important; // neon-green
  }
  :deep(.p-datatable-column-sorted .p-datatable-column-title),
  :deep([data-p-sorted='true'] .p-datatable-column-title),
  :deep(.p-datatable-column-sorted .p-datatable-sort-icon),
  :deep([data-p-sorted='true'] .p-datatable-sort-icon),
  :deep(.p-datatable-column-sorted .p-datatable-sort-badge),
  :deep([data-p-sorted='true'] .p-datatable-sort-badge) {
    color: #14ffa5 !important; // neon-green для контрасту на темному фоні
  }

  // рядки з даними
  :deep(.p-datatable-tbody > tr) {
    background-color: #111827; // bg-gray-900
    border-bottom: 1px solid #27272a; // divide-gray-800
  }
  :deep(.p-datatable-tbody > tr:hover) {
    background-color: #1f2937; // bg-gray-800 on hover
  }

  // клітинки
  :deep(.p-datatable-tbody > tr > td) {
    padding: 0.75rem 1.5rem; // py-3 px-6
    color: #d1d5db; // text-gray-300
    font-size: 0.875rem; // text-sm
    white-space: nowrap;
  }

  // порожній стан
  :deep(.p-datatable-emptymessage td) {
    text-align: center;
    color: #9ca3af; // text-gray-400
    padding: 1rem;
  }

  // loading overlay — центруємо спіннер по вертикалі та горизонталі
  :deep(.p-datatable-loading-overlay),
  :deep(.p-datatable-mask) {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 120px;
  }

  :deep(.p-datatable-loading-icon),
  :deep(.p-datatable-loading-overlay .p-icon),
  :deep(.p-datatable-mask .p-icon) {
    width: 2rem;
    height: 2rem;
  }

  // забезпечуємо relative-контекст для overlay
  :deep(.p-datatable) {
    position: relative;
  }

  // пагінація (якщо використовуєте)
  :deep(.p-paginator) {
    background-color: #1f2937; // bg-gray-800
    color: #d1d5db; // text-gray-300
    border-top: 1px solid #374151; // border-gray-700
  }
}
</style>
