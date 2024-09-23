import { beforeEach, describe, expect, it } from 'vitest'
import DataTable from './DataTable.vue'
import _DataTable from 'primevue/datatable'
import { VueWrapper, shallowMount } from '@vue/test-utils'
import Card from 'primevue/card'
import Column from 'primevue/column'
import { stubComponent } from '@/helpers/testHelpers/createComponent'

const table = {
  headers: [
    {
      header: 'Кількість',
      field: 'quantity'
    },
    {
      header: 'Дата покупки',
      field: 'purchase.date'
    },
    {
      header: 'Тікер',
      field: 'ticker'
    },
    {
      header: 'Всього',
      field: 'total'
    }
  ],
  data: [
    {
      ticker: 'AAPL',
      date: '2021-01-01'
    }
  ]
}

const CardStub = stubComponent(Card, {
  template: `
    <div>
      <slot name="title"></slot>
      <slot name="content"></slot>
    </div>
  `
})

const DataTableStub = stubComponent(_DataTable)

const ColumnStub = stubComponent(Column, {
  template: `
    <div v-if="field === 'quantity'">
      <slot name="body" :field :data="{ quantity: 2 }" />
    </div>
    <div v-else-if="field === 'purchase.date'">
      <slot name="body" :field :data="{ date: 'Fri Dec 09 2022 10:15:02 GMT+0200 (Восточная Европа, стандартное время)' }" :type="2"></slot>
    </div>
    <div v-else-if="field === 'ticker'">
      <slot name="body" :field :data="{ ticker: 'Тікер' }"></slot>
    </div>
    <div v-else-if="field === 'total'">
      <slot name="body" :field :data="{ total: 112 }"></slot>
    </div>
  `,
  props: ['field', 'data']
})

describe('DataTable', () => {
  let wrapper: VueWrapper<InstanceType<typeof DataTable>>

  const findColumnByHeader = (header: string) =>
    wrapper.findAllComponents(Column).find((col) => col.attributes().header === header)

  beforeEach(() => {
    wrapper = shallowMount(DataTable, {
      global: {
        stubs: {
          Card: CardStub,
          Column: ColumnStub,
          DataTable: DataTableStub
        }
      },
      props: {
        table,
        editMode: 'cell',
        notEditableColumns: ['total']
      },
      slots: {
        addRow: '<button>+</button>',
        header: '<h1>Title</h1>',
        editRow: '<button>Edit</button>'
      }
    })
  })

  it('should render column when props table is passed', () => {
    console.log(wrapper.html())

    const COLUMN_LENGTH = 4
    const ColumnStub = wrapper.findAllComponents(Column)

    expect(wrapper.props().table).toBeDefined()
    expect(ColumnStub.length).toStrictEqual(COLUMN_LENGTH)
  })

  it('should render headers', () => {
    const HEADER = 'Кількість'
    const ColumnStub = wrapper.findComponent(Column)

    expect(ColumnStub.exists).toBeTruthy()
    expect(ColumnStub.attributes().header).toContain(HEADER)
  })

  it('should not provide input for data changing if field is not editable', () => {
    const HEADER = 'Всього '
    const TEXT = '112'
    const ColumnStub = findColumnByHeader(HEADER)

    expect(ColumnStub?.exists()).toBeTruthy()
    expect(ColumnStub?.text()).toBe(TEXT)
    expect(ColumnStub?.findComponent({ name: 'UiNumberInput' }).exists()).toBeFalsy()
  })
})
