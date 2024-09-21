import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { shallowMount, type VueWrapper } from '@vue/test-utils'
import SoldMonthlyGraph from '@/components/DataCharts/SoldMonthlyDiagram/SoldMonthlyDiagram.vue'
import { type Deal, type Operation } from '@/components/common/DataTable/mocks'
import UiChart from '@/components/common/UiChart/UiChart.vue'
import { nextTick } from 'vue'
import { stackedGraphOptions } from '@/components/DataCharts/common/constants'
import UiCard from '@/components/common/UiCard/UiCard.vue'
import { stubComponent } from '@/helpers/testHelpers/createComponent'

vi.mock('@/components/DataCharts/common/helpers', () => ({
  getResultByTickerEachMonth: vi.fn().mockImplementation((operation: Operation) => {
    return () => {
      if (operation === 'sale') {
        return {
          labels: ['січень'],
          datasets: [
            {
              label: 'MSFT',
              data: [23166, ...Array(11).fill(0)]
            }
          ]
        }
      } else {
        return {
          labels: ['січень'],
          datasets: [
            {
              label: 'MSFT',
              data: [7321.86, ...Array(11).fill(0)]
            }
          ]
        }
      }
    }
  })
}))

const mockDeals: Deal[] = [
  {
    id: Symbol(),
    purchase: {
      commission: 2.7,
      date: new Date('2021-01-10'),
      price: 15,
      rate: 26,
      sum: 270,
      uah: 7321.86
    },
    quantity: 18,
    sale: {
      commission: 5.94,
      date: new Date('2021-01-11'),
      price: 33,
      rate: 39,
      sum: 594,
      uah: 23166
    },
    ticker: 'MSFT',
    total: 15844.14,
    percent: 2.163950143815916
  }
]

const UiCardStub = stubComponent(UiCard, {
  template: `
    <div>
      <slot name="title"></slot>
      <slot />
    </div>
  `
})

describe('SoldMonthlyDiagram', () => {
  let wrapper: VueWrapper<InstanceType<typeof SoldMonthlyGraph>>

  const getCardTitle = (operation: 'sale' | 'purchase') =>
    `Діаграма ${operation === 'purchase' ? 'придбань' : 'продажів'} за рік по активам`

  beforeEach(() => {
    wrapper = shallowMount(SoldMonthlyGraph, {
      global: {
        stubs: {
          UiChart,
          UiCard: UiCardStub
        }
      },
      props: {
        deals: mockDeals,
        stacked: false,
        operation: 'sale'
      }
    })
  })

  afterEach(() => {
    wrapper.unmount()

    vi.clearAllMocks()
  })

  it('should contain type of bar', () => {
    const uiChart = wrapper.findComponent(UiChart)

    expect(uiChart.attributes().type).toStrictEqual('bar')
  })

  it('should group result when operation is sale', () => {
    const uiChart = wrapper.findComponent(UiChart)

    expect(uiChart.props().chartData).toMatchSnapshot()
  })

  it('should group result when operation is purchase', async () => {
    await wrapper.setProps({ operation: 'purchase' })

    const uiChart = wrapper.findComponent(UiChart)

    expect(uiChart.props().chartData).toMatchSnapshot()
  })

  it('should contain custom chart options when props stacked is passed', async () => {
    wrapper.setProps({ stacked: true })

    await nextTick()

    const uiChart = wrapper.findComponent(UiChart)

    expect(uiChart.props().options).toEqual(stackedGraphOptions)
  })

  it('should not contain custom options when stacked is not passed', async () => {
    wrapper.setProps({ stacked: false })

    await nextTick()

    const uiChart = wrapper.findComponent(UiChart)

    expect(uiChart.props().options).toBeUndefined()
  })

  it('should render sell title', () => {
    const CARD_TITLE = getCardTitle(wrapper.props().operation)

    const uiCard = wrapper.findComponent(UiCard)

    expect(uiCard.text()).toContain(CARD_TITLE)
  })

  it('should render purchase title', async () => {
    await wrapper.setProps({ operation: 'purchase' })

    const CARD_TITLE = getCardTitle(wrapper.props().operation)

    const uiCard = wrapper.findComponent(UiCard)

    expect(uiCard.text()).toContain(CARD_TITLE)
  })
})
