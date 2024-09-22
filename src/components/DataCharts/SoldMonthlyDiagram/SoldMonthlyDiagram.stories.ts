import type { Meta, StoryFn } from '@storybook/vue3'
import { getDeal } from '@/components/common/DataTable/mocks/index'
import SoldMonthlyDiagram from './SoldMonthlyDiagram.vue'

type StoryComponent = StoryFn<typeof SoldMonthlyDiagram>

const meta: Meta<typeof SoldMonthlyDiagram> = {
  component: SoldMonthlyDiagram,
  args: {
    deals: [
      getDeal({
        purchaseDate: new Date('2021-01-01'),
        saleDate: new Date('2021-02-10'),
        ticker: 'AAPL',
        quantity: 50,
        purchasePrice: 100,
        salePrice: 200
      }),
      getDeal({
        purchaseDate: new Date('2021-01-01'),
        saleDate: new Date('2021-01-11'),
        ticker: 'AAPL',
        quantity: 10,
        purchasePrice: 100,
        salePrice: 200
      }),
      getDeal({
        purchaseDate: new Date('2021-02-01'),
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
    stacked: true,
    operation: 'purchase'
  },
  argTypes: {
    deals: {
      control: 'object'
    },
    stacked: {
      control: 'boolean'
    },
    operation: {
      control: 'radio',
      options: ['sale', 'purchase']
    }
  }
}

export default meta

export const Default: StoryComponent = (args) => ({
  components: { SoldMonthlyDiagram },
  setup() {
    return { args }
  },
  template: `
    <SoldMonthlyDiagram v-bind="{ ...args }" />
  `
})
