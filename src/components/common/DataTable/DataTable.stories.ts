import type { Meta, StoryObj } from '@storybook/vue3'
import DataTable from './DataTable.vue'
import { Currency } from '@/constants/currencies'
import type { DataTableCellEditCompleteEvent } from 'primevue/datatable'
import { assocPath } from 'ramda'
import { getDeal } from './mocks'
import { resultHeaders } from './constants'

const table = {
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
}

export const Default: Story = {
  args: {
    table,
    currency: Currency.USD
  },
  argTypes: {
    currency: {
      control: 'radio',
      options: Object.values(Currency).filter((currency) => !currency.includes(Currency.UAH))
    }
  }
}

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
  }),
  ...Default
}

export default meta

type Story = StoryObj<typeof DataTable>

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
    template: `
    <DataTable v-bind="{...args}">
      <template #header>Мої угоди</template>
    </DataTable>
  `
  }),
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
        getDeal(),
        getDeal(),
        getDeal()
      ]
    },
    currency: Currency.USD
  }
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
  args: Default.args
}

export const CurrencySign: Story = {
  render: (args) => ({
    components: { DataTable },
    setup() {
      return { args }
    },
    template: `
      <DataTable v-bind="{...args}">
        <template #purchase.date="{ value }"> {{ $d(value) }}</template>
        <template #purchase.price="{ value }"> {{ $n(value, { style: 'currency', currency: 'USD' }) }}</template>
        <template #purchase.sum="{ value }"> {{ $n(value, { style: 'currency', currency: 'USD' }) }}</template>
        <template #purchase.commission="{ value }"> {{ $n(value, { style: 'currency', currency: 'USD' }) }}</template>
        <template #purchase.rate="{ value }"> {{ $n(value, 'currency') }}</template>
        <template #purchase.uah="{ value }"> {{ $n(value, 'currency') }}</template>
      </DataTable>
    `
  }),
  args: Default.args
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

export const NotEditableCols: Story = {
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
    editMode: 'cell',
    notEditableColumns: ['date']
  },
  argTypes: {
    notEditableColumns: {
      control: 'multi-select',
      options: table.headers.map((header) => header.field)
    }
  }
}
