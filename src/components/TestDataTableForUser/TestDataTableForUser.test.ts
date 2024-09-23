import { stubComponent } from '@/helpers/testHelpers/createComponent'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import _DataTable from '@/components/common/DataTable/DataTable.vue'
import { shallowMount, type VueWrapper } from '@vue/test-utils'
import TestDataTableForUser from '@/components/TestDataTableForUser/TestDataTableForUser.vue'
import _UiSelectButton from '@/components/common/UiSelectButton/UiSelectButton.vue'
import UiButton from '@/components/common/UiButton/UiButton.vue'

vi.mock('@/components/common/DataTable/mocks', () => ({
  getDeal: vi.fn().mockReturnValue({
    id: Symbol(),
    purchase: {
      commission: 1,
      date: new Date(),
      price: 199,
      rate: 34,
      sum: 199,
      uah: 199 * 34
    },
    quantity: 1,
    sale: {
      commission: 1,
      date: new Date(),
      price: 199,
      rate: 34,
      sum: 199,
      uah: 199 * 34
    },
    ticker: 'APPL',
    total: 199 * 34 - 199 * 33,
    percent: ((199 * 34) / 199) * 34 - 1
  })
}))

vi.mock('@/api/getCurrencyExchange', () => ({
  getCurrencyExchange: vi.fn().mockResolvedValue({ rate: 44.84 })
}))

const DataTable = stubComponent(_DataTable, {
  template: `
    <div>
     <slot name="header" />
     <slot name="deleteRow" :index="0" />
     <slot name="addRow" />
    </div>
  `
})

const UiSelectButton = stubComponent(_UiSelectButton)

// const isArraysEqual = compose(isEmpty, symmetricDifference)

describe('Test DataTable for user', () => {
  let wrapper: VueWrapper<InstanceType<typeof TestDataTableForUser>>

  beforeEach(() => {
    wrapper = shallowMount(TestDataTableForUser, {
      global: {
        stubs: {
          DataTable,
          UiSelectButton,
          UiButton
        }
      }
    })
  })

  afterEach(() => {
    wrapper.unmount()

    vi.clearAllMocks()
  })

  it('Renders correctly', () => {
    expect(wrapper.exists()).toBeTruthy()
  })
})

// const findSelectButton = <T>(modelValue: T) =>
//   wrapper.findAllComponents(UiSelectButton).find((btn) => btn.attributes().modelvalue === modelValue)

// it('Select currency button has certain params', () => {
//   const BUTTON_OPTIONS = `${Currency.USD},${Currency.EUR}`
//   const CurrencyButton = findSelectButton<Currencies>(Currency.USD)

//   expect(CurrencyButton?.attributes().modelvalue).toEqual(Currency.USD)
//   expect(CurrencyButton?.attributes().options).toStrictEqual(BUTTON_OPTIONS)
// })

// it('Changes table size to small with select button', async () => {
//   let SelectSizeButton = findSelectButton<TableSizes>(TableSize.LG)

//   await SelectSizeButton?.setValue(TableSize.SM)
//   await SelectSizeButton?.trigger('click')

//   SelectSizeButton = findSelectButton(TableSize.SM)

//   expect(SelectSizeButton?.exists()).toBeTruthy()
//   expect(SelectSizeButton?.attributes().modelvalue).toStrictEqual(TableSize.SM)
// })

// it('Small table contains particular columns', async () => {
//   const SMALL_TABLE_HEADERS = ['ticker', 'sale.uah', 'purchase.uah', 'total']
//   let SelectSizeButton = findSelectButton<TableSizes>(TableSize.LG)

//   const SmallDataTable = wrapper.findComponent(DataTable)

//   await SelectSizeButton?.setValue(TableSize.SM)
//   await SelectSizeButton?.trigger('click')

//   SelectSizeButton = findSelectButton(TableSize.SM)

//   const CURRENT_HEADERS = (SmallDataTable.props().table.headers as TableHeaders[]).map((header) => header.field)

//   expect(SelectSizeButton?.attributes().modelvalue).toStrictEqual(TableSize.SM)
//   expect(isArraysEqual(CURRENT_HEADERS, SMALL_TABLE_HEADERS)).toBeTruthy()
// })

// it('Changes currency with select button', async () => {
//   const SelectCurrencyButton = findSelectButton<Currencies>(Currency.USD)

//   await SelectCurrencyButton?.setValue(Currency.EUR)
//   await SelectCurrencyButton?.trigger('click')

//   expect(SelectCurrencyButton?.attributes().modelvalue).toStrictEqual(Currency.EUR)
// })

// it('Select Buttons must have attribute of allowEmpty to false', () => {
//   const SelectCurrencyButton = findSelectButton<Currencies>(Currency.USD)
//   const SelectSizeButton = findSelectButton<TableSizes>(TableSize.LG)

//   expect(SelectCurrencyButton?.attributes().allowempty).toEqual('false')
//   expect(SelectSizeButton?.attributes().allowempty).toEqual('false')
// })

// const ADD_BTN_TEXT = 'Добавити рядок'
// it('Add button attrs', () => {
//   console.log(wrapper.html());

//   const DELETE_ICON = 'pi pi-plus'
//   const LABEL = 'Добавити рядок'
//   const addButton = wrapper.findAllComponents(UiButton).find((btn) => btn.attributes().label === ADD_BTN_TEXT)

//   expect(addButton?.attributes().icon).toStrictEqual(DELETE_ICON)
//   expect(addButton?.attributes().label).toStrictEqual(LABEL)
// })

// it('Clicking add button adds new row', async () => {
//   const addButton = wrapper.findAllComponents(UiButton).find((btn) => btn.attributes().label === ADD_BTN_TEXT)
//   const dataTable = wrapper.findComponent(DataTable)

//   const INITIAL_DATA_LENGTH = dataTable.props().table.data.length

//   await addButton?.trigger('click')

//   expect(dataTable.props().table.data.length).toStrictEqual(INITIAL_DATA_LENGTH + 1)
// })

// it('Clicking delete icon should delete row', async () => {
//   const DELETE_ICON = 'pi pi-trash'
//   const dataTable = wrapper.findComponent(DataTable)
//   const deleteButton = wrapper.findAllComponents(UiButton).find((btn) => btn.attributes().icon === DELETE_ICON)

//   const INITIAL_DATA_LENGTH = dataTable.props().table.data.length

//   await deleteButton?.trigger('click')

//   expect(dataTable.props().table.data.length).toStrictEqual(INITIAL_DATA_LENGTH - 1)
// })

// it('Large data table must have some not editable columns', () => {
//   const notEditableCols = [
//     'total',
//     'percent',
//     'sale.uah',
//     'sale.sum',
//     'purchase.uah',
//     'sale.uah',
//     'purchase.sum',
//     'sale.rate',
//     'purchase.rate'
//   ]

//   const dataTable = wrapper.findComponent(DataTable)

//   expect(isArraysEqual(dataTable.props().notEditableColumns, notEditableCols)).toBeTruthy()
// })

// it('Small data table have all columns uneditable', async () => {
//   const SMALL_TABLE_HEADERS = ['ticker', 'sale.uah', 'purchase.uah', 'total']
//   const selectButton = findSelectButton<TableSizes>(TableSize.LG)

//   await selectButton?.setValue(TableSize.SM)
//   await selectButton?.trigger('click')

//   const dataTable = wrapper.findComponent(DataTable)

//   expect(isArraysEqual(dataTable.props().notEditableColumns, SMALL_TABLE_HEADERS)).toBeTruthy()
// })

// it('Fetched and changed rates correctly', async () => {
//   const RATE = 44.84
//   const dates: string[] = []

//   const selectButton = findSelectButton<Currencies>(Currency.USD)
//   const dataTable = wrapper.findComponent(DataTable)

//   const deals: Deal[] = dataTable.props().table.data

//   deals.forEach((deal) => {
//     dates.push(String(deal.purchase.date), String(deal.sale.date))
//   })

//   await selectButton?.setValue(Currency.EUR)
//   await selectButton?.trigger('click')

//   dates.forEach((date) => {
//     expect(getCurrencyExchange).toHaveBeenCalledWith(Currency.EUR, date)
//   })

//   expect(getCurrencyExchange).toHaveBeenCalledTimes(dates.length)

//   expect(selectButton?.attributes().modelvalue).toStrictEqual(Currency.EUR)

//   deals.forEach((deal) => {
//     expect(deal.purchase.rate).toStrictEqual(RATE)
//     expect(deal.sale.rate).toStrictEqual(RATE)
//   })
// })

// it('Small data table group tickers by ticker name and sum it data', async () => {
//   const TICKER_NAME = 'APPL'
//   const INITIAL_LENGTH = 1
//   const TOTAL_RESULT = 398

//   let dataTable = wrapper.findComponent(DataTable)
//   const addButton = wrapper.findAllComponents(UiButton).find((btn) => btn.attributes().label === ADD_BTN_TEXT)

//   expect(dataTable.props().table.data.length).toStrictEqual(INITIAL_LENGTH)

//   await addButton?.trigger('click')

//   const selectSizeButton = findSelectButton<TableSizes>(TableSize.LG)

//   await selectSizeButton?.setValue(TableSize.SM)
//   await selectSizeButton?.trigger('click')

//   dataTable = wrapper.findComponent(DataTable)

//   const [applDeal] = dataTable.props().table.data
//   const filteredDealsByAppl = dataTable.props().table.data.filter((deal: Deal) => deal.ticker === TICKER_NAME)

//   expect(filteredDealsByAppl.length).toStrictEqual(INITIAL_LENGTH)
//   expect(applDeal.total).toStrictEqual(TOTAL_RESULT)
// })
