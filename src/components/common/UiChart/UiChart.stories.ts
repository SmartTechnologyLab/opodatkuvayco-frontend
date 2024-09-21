import type { Meta, StoryFn } from '@storybook/vue3'
import UiChart from './UiChart.vue'
import { setChartData } from './common/helpers'

type StoryComponent = StoryFn<typeof UiChart>

const chartData = setChartData([65, 59, 80, 81, 56], ['January', 'February', 'March', 'April', 'May'])

const meta: Meta<typeof UiChart> = {
  component: UiChart,
  args: {
    chartData
  },
  argTypes: {
    chartData: {
      control: 'object'
    }
  }
}

export default meta

export const Bar: StoryComponent = (args) => ({
  components: { UiChart },
  setup() {
    return { args }
  },
  template: `
    <div>
      <UiChart v-bind="{ ...args }" type="bar" />
    </div>
  `
})

export const Doughnut: StoryComponent = (args) => ({
  components: { UiChart },
  setup() {
    return { args }
  },
  template: `
    <UiChart v-bind="{ ...args }" type="doughnut" />
  `
})

export const Line: StoryComponent = (args) => ({
  components: { UiChart },
  setup() {
    return { args }
  },
  template: `
    <UiChart v-bind="{ ...args }" type="line" />
  `
})

export const Pie: StoryComponent = (args) => ({
  components: { UiChart },
  setup() {
    return { args }
  },
  template: `
    <UiChart v-bind="{ ...args }" type="pie" />
  `
})
