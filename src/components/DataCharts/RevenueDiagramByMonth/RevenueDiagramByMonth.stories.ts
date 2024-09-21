import type { Meta, StoryFn } from '@storybook/vue3'
import { getDeal } from '@/components/common/DataTable/mocks'
import RevenueDiagramByMonth from './RevenueDiagramByMonth.vue'

type StoryComponent = StoryFn<typeof RevenueDiagramByMonth>

const meta: Meta<typeof RevenueDiagramByMonth> = {
  component: RevenueDiagramByMonth,
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
    ],
    operation: 'sale'
  },
  argTypes: {
    deals: {
      control: 'object'
    },
    operation: {
      control: 'radio',
      options: ['sale', 'purchase']
    }
  }
}

export default meta

export const Default: StoryComponent = (args) => ({
  components: { RevenueDiagramByMonth },
  setup() {
    return { args }
  },
  template: `
    <RevenueDiagramByMonth v-bind="{ ...args }" />
  `
})
