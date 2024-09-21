import { shallowMount, type VueWrapper } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import RevenueChartByMonth from '@/components/DataCharts/RevenueDiagramByMonth/RevenueDiagramByMonth.vue'
import { stubComponent } from '@/helpers/testHelpers/createComponent'
import UiCard from '@/components/common/UiCard/UiCard.vue'
import type { Deal, Operation } from '@/components/common/DataTable/mocks'
import UiChart from '@/components/common/UiChart/UiChart.vue'

vi.mock('@/components/DataCharts/common/helpers', () => ({
  getRevenueByPurchaseMonth: vi.fn().mockImplementation((operation: Operation) => {
    return () => {
      if (operation === 'sale') {
        return {
          labels: ['січень'],
          datasets: [
            {
              label: 'MSFT',
              data: [23166]
            }
          ]
        }
      } else {
        return {
          labels: ['січень'],
          datasets: [
            {
              label: 'MSFT',
              data: [7321.86]
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

describe('RevenueDiagramByMonth', () => {
  let wrapper: VueWrapper<InstanceType<typeof RevenueChartByMonth>>

  const getCardTitle = (operation: 'sale' | 'purchase') =>
    `Діаграма ${operation === 'purchase' ? 'придбань' : 'продажів'} за рік`

  beforeEach(() => {
    wrapper = shallowMount(RevenueChartByMonth, {
      global: {
        stubs: {
          UiChart,
          UiCard: UiCardStub
        }
      },
      props: {
        deals: mockDeals,
        operation: 'sale'
      }
    })
  })

  it('should render the sell card title', () => {
    const CARD_TITLE = getCardTitle(wrapper.props().operation)
    const uiCard = wrapper.findComponent(UiCard)

    expect(uiCard.text()).toBe(CARD_TITLE)
  })

  it('should render the purchase card title', async () => {
    const uiCard = wrapper.findComponent(UiCard)
    await wrapper.setProps({ operation: 'purchase' })

    const CARD_TITLE = getCardTitle(wrapper.props().operation)

    expect(uiCard.text()).toBe(CARD_TITLE)
  })

  it('should calculate data when deals passed', () => {
    const uiChart = wrapper.findComponent(UiChart)

    expect(uiChart.props().chartData).toMatchSnapshot()
  })

  it('should change operation and recalculate the result', async () => {
    await wrapper.setProps({ operation: 'purchase' })

    const uiChart = wrapper.findComponent(UiChart)

    expect(uiChart.props().chartData).toMatchSnapshot()
  })
})
