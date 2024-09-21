import type { Meta, StoryFn } from '@storybook/vue3'
import AssetsPercentageDoughnut from '@/components/DataCharts/AssetsPercentageDoughnut/AssetsPercentageDoughnut.vue'
import { getDeal } from '@/components/common/DataTable/mocks'

type StoryComponent = StoryFn<typeof AssetsPercentageDoughnut>

const meta: Meta<typeof AssetsPercentageDoughnut> = {
  component: AssetsPercentageDoughnut,
  args: {
    deals: [
      getDeal({
        purchaseDate: new Date('2021-01-01'),
        saleDate: new Date('2021-01-10'),
        ticker: 'AAPL',
        quantity: 50,
        purchasePrice: 100,
        salePrice: 200
      }),
      getDeal({
        purchaseDate: new Date('2021-02-01'),
        saleDate: new Date('2021-01-10'),
        ticker: 'AAPL',
        quantity: 10,
        purchasePrice: 100,
        salePrice: 200
      }),
      getDeal({
        purchaseDate: new Date('2021-01-01'),
        saleDate: new Date('2021-02-10'),
        ticker: 'AMZN',
        quantity: 20,
        purchasePrice: 100,
        salePrice: 200
      }),
      getDeal({
        purchaseDate: new Date('2021-03-01'),
        saleDate: new Date('2021-04-10'),
        ticker: 'GOOGL',
        quantity: 150,
        purchasePrice: 100,
        salePrice: 200
      })
    ]
  },
  argTypes: {
    deals: {
      control: 'object'
    }
  }
}

export default meta

export const Default: StoryComponent = (args) => ({
  components: { AssetsPercentageDoughnut },
  setup() {
    return { args }
  },
  template: `
    <AssetsPercentageDoughnut v-bind="{ ...args }" />
  `
})
