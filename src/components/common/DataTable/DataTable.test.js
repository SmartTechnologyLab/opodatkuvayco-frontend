import { afterAll, beforeAll, beforeEach, describe, it } from 'vitest'
import DataTable from './DataTable.vue'
import _DataTable from 'primevue/datatable'
import { config, shallowMount } from '@vue/test-utils'
import { stubComponent } from '../../../helpers/testsHelpers/createComponent.ts'
import Card from 'primevue/card'
import Column from 'primevue/column'

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

const CardStub = stubComponent(Card, {
  template: `
    <div>
      <slot name="title"></slot>
      <slot name="content"></slot>
    </div>
  `
})

const ColumnStub = stubComponent(Column, {
  template: `
    <div> 
      <slot name="body" field="date" :data="{ date: 0.03 }" type="3" ></slot>
    </div> 
  `
  // slots: {
  //   body: '<p>{{params.data}},{{params.field}}</p>'
  // }
})

describe('DataTable', () => {
  let wrapper

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
          DataTable: _DataTable
        }
      },
      props: {
        table
      }
    })
  })

  it('should render headers', () => {
    // expect(wrapper.html()).toContain('Тікер')

    console.log(wrapper.html()) //?
  })
})
