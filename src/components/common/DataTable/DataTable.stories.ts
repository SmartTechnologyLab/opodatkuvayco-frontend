import type { Meta, StoryObj } from '@storybook/vue3'
import DataTable from './DataTable.vue'
import { resultHeaders } from '@/components/common/DataTable/constants'
import { getDeal } from '@/components/common/DataTable/mocks'
import { Currency } from '@/constants/currencies'
import type { DataTableCellEditCompleteEvent } from 'primevue/datatable'
import { assocPath } from 'ramda'

const meta: Meta<typeof DataTable> = {
  component: DataTable,
  render: (args) => ({
    components: { DataTable },
    setup() {
      return { args }
    },
    template: `
      <DataTable v-bind="{...args }" />
    `
  })
}

export default meta

type Story = StoryObj<typeof DataTable>

export const Default: Story = {
  args: {
    table: {
      headers: [
        {
          header: 'Тікер',
          field: 'ticker'
        },
        {
          header: 'Дата покупки',
          field: 'date'
        }
      ],
      data: [
        {
          ticker: 'AAPL',
          date: '2021-01-01'
        },
        {
          ticker: 'GOOGL',
          date: '2021-01-01'
        },
        {
          ticker: 'MSFT',
          date: '2021-01-01'
        }
      ]
    },
    currency: Currency.USD
  }
}

const FullTableData: Story = {
  args: {
    table: {
      headers: resultHeaders,
      data: [
        getDeal({
          ticker: 'DAL',
          quantity: 2,
          purchaseRate: 29.2549,
          purchasePrice: 28.88,
          purchaseCommission: 1.49,
          saleRate: 36.5686,
          salePrice: 42.42,
          saleCommission: 1.62
        }),
        getDeal(),
        getDeal()
      ]
    },
    currency: Currency.USD
  }
}

export const EmptyData: Story = {
  args: {
    table: {
      headers: [
        {
          header: 'Тікер',
          field: 'ticker'
        },
        {
          header: 'Дата покупки',
          field: 'date'
        }
      ],
      data: []
    }
  }
}

export const Slot: Story = {
  render: (args) => ({
    components: { DataTable },
    setup() {
      return { args }
    },
    template: `
    <DataTable v-bind="{...args}">
      <template #header>Мої угоди</template>
      <template #ticker="{ value }">🎉 {{ value }} 🎉</template>
      <template #date="{ value }"> {{ $d(value) }}</template>
    </DataTable>
  `
  }),
  args: Default.args
}

export const MockedSlot: Story = {
  render: (args) => ({
    components: { DataTable },
    setup() {
      return { args }
    },
    slots: {
      header: 'dodqdq'
    },
    template: `
    <DataTable v-bind="{ ...args }">
      <template #header>Мої угоди</template>
      <template #purchase.date="{ value }"> {{ $d(value) }}</template>
      <template #purchase.price="{ value }"> {{ $n(value, { style: 'currency', currency: 'USD' }) }}</template>
      <template #purchase.sum="{ value }"> {{ $n(value, { style: 'currency', currency: 'USD' }) }}</template>
      <template #purchase.commission="{ value }"> {{ $n(value, { style: 'currency', currency: 'USD' }) }}</template>
      <template #purchase.rate="{ value }"> {{ $n(value, 'currency') }}</template>
      <template #purchase.uah="{ value }"> {{ $n(value, 'currency') }}</template>
      <template #sale.date="{ value }"> {{ $d(value) }}</template>
      <template #sale.price="{ value }"> {{ $n(value, { style: 'currency', currency: 'USD' }) }}</template>
      <template #sale.sum="{ value }"> {{ $n(value, { style: 'currency', currency: 'USD' }) }}</template>
      <template #sale.commission="{ value }"> {{ $n(value, { style: 'currency', currency: 'USD' }) }}</template>
      <template #sale.rate="{ value }"> {{ $n(value, 'currency') }}</template>
      <template #sale.uah="{ value }"> {{ $n(value, 'currency') }}</template>
      <template #quantity="{ value }"> {{  $n(value) }}</template>
      <template #total="{ value }"> {{  $n(value, 'currency') }}</template>
      <template #percent="{ value }"> {{  $n(value, 'percent') }}</template>
    </DataTable>
  `
  }),
  args: FullTableData.args
}

export const HeaderType: Story = {
  render: (args) => ({
    components: { DataTable },
    setup() {
      return { args }
    },
    template: `
    <DataTable v-bind="{...args}" />
  `
  }),
  args: Default.args
}

export const Sortable: Story = {
  render: (args) => ({
    components: { DataTable },
    setup() {
      return { args }
    },
    template: `
      <DataTable v-bind="{...args}" />
    `
  }),
  args: FullTableData.args
}

export const Editable: Story = {
  render: (args) => ({
    components: { DataTable },
    setup() {
      return { args }
    },
    template: `
      <DataTable v-bind="{...args}" @onCellEdit="onCellEdit($event)">
        <template #header>Мої угоди</template>
        <template #ticker="{ value }">🎉 {{ value }} 🎉</template>
        <template #date="{ value }">{{ $d(value) }}</template>
      </DataTable>
    `,
    methods: {
      onCellEdit(event: DataTableCellEditCompleteEvent) {
        const { newValue, index, field } = event

        if (newValue) {
          const editedRow = args.table.data[index]

          const fieldPath = field.split('.')

          const updatedRow = assocPath(fieldPath, newValue, editedRow)

          args.table.data[index] = updatedRow
        }
      }
    }
  }),
  args: {
    ...Default.args,
    editMode: 'cell'
  }
}
