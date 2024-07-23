import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import DataTable from './DataTable.vue'
import _DataTable from 'primevue/datatable'
import { VueWrapper, config, shallowMount } from '@vue/test-utils'
import Card from 'primevue/card'
import Column from 'primevue/column'
import UiInput from '../UiInput/UiInput.vue'
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
      <slot name="editor" :field :data="{ quantity: 2 }"></slot>
      <slot name="empty" />
    </div>
    <div v-else-if="field === 'purchase.date'">
      <slot name="body" :field :data="{ date: 'Fri Dec 09 2022 10:15:02 GMT+0200 (Восточная Европа, стандартное время)' }" :type="2"></slot>
      <slot name="editor" :field :data="{ date: 'Fri Dec 09 2022 10:15:02 GMT+0200 (Восточная Европа, стандартное время)' }" :type="2"></slot>
    </div>
    <div v-else-if="field === 'ticker'">
      <slot name="body" :field :data="{ ticker: 'Тікер' }"></slot>
      <slot name="editor" :field :data="{ ticker: 'Тікер' }"></slot>
    </div>
    <div v-else-if="field === 'total'">
      <slot name="body" :field :data="{ total: 112 }"></slot>
      <slot name="editor" :field :data="{ total: 112 }"></slot>
    </div>
  `,
  props: ['field', 'data']
})

describe('DataTable', () => {
  let wrapper: VueWrapper<InstanceType<typeof DataTable>>

  const findColumnByHeader = (header: string) =>
    wrapper.findAllComponents(Column).find((col) => col.attributes().header === header)

  beforeAll(() => {
    config.global.renderStubDefaultSlot = true
  })

  afterAll(() => {
    config.global.renderStubDefaultSlot = false
  })

  beforeEach(() => {
    wrapper = shallowMount(DataTable, {
      global: {
        stubs: {
          Card: CardStub,
          Column: ColumnStub,
          DataTable: DataTableStub,
          UiInput
        }
      },
      props: {
        table,
        editMode: 'cell',
        notEditableColumns: ['total']
      },
      slots: {
        addRow: '<button>+</button>',
        header: '<h1>Title</h1>'
      }
    })
  })

  it('should render column when props table is passed', () => {
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

  it('should render field with modelvalue', () => {
    const VALUE_NUMBER = '2'
    const VALUE_TEXT = 'Тікер'
    const UiNumberInput = wrapper.findComponent({ name: 'UiNumberInput' })
    const UiInput = wrapper.findComponent({ name: 'UiInput' })

    expect(UiInput.attributes().modelvalue).toStrictEqual(VALUE_TEXT)
    expect(UiNumberInput.attributes().modelvalue).toStrictEqual(VALUE_NUMBER)
  })

  it('should render number input when field is quantity', () => {
    const HEADER = 'Кількість '
    const ColumnStub = findColumnByHeader(HEADER)
    const UiNumberInput = ColumnStub?.findComponent({ name: 'UiNumberInput' })

    expect(ColumnStub?.exists()).toBeTruthy()
    expect(UiNumberInput?.exists()).toBe(true)
  })

  it('should render text input when field is quantity', () => {
    const HEADER = 'Тікер '
    const ColumnStub = findColumnByHeader(HEADER)
    const UiInput = ColumnStub?.findComponent({ name: 'UiInput' })

    expect(ColumnStub?.exists()).toBeTruthy()
    expect(UiInput?.exists()).toBe(true)
  })

  it('should render calendar when field is quantity', () => {
    const HEADER = 'Дата покупки '
    const ColumnStub = findColumnByHeader(HEADER)
    const UiCalendar = ColumnStub?.findComponent({ name: 'UiCalendar' })

    expect(ColumnStub?.exists()).toBeTruthy()
    expect(UiCalendar?.exists()).toBe(true)
  })

  it('should not provide input for data changing if field is not editable', () => {
    const HEADER = 'Всього '
    const TEXT = '112'
    const ColumnStub = findColumnByHeader(HEADER)

    expect(ColumnStub?.exists()).toBeTruthy()
    expect(ColumnStub?.text()).toBe(TEXT)
    expect(ColumnStub?.findComponent({ name: 'UiNumberInput' }).exists()).toBeFalsy()
  })

  it('should render own slots', () => {
    const BTN_TEXT = '+'
    const TITLE = 'Title'
    const button = wrapper.find('button')
    const title = wrapper.find('h1')

    expect(button).toBeDefined()
    expect(title).toBeDefined()
    expect(button.text()).toStrictEqual(BTN_TEXT)
    expect(title.text()).toStrictEqual(TITLE)
  })
})
