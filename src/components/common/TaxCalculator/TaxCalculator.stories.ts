import TaxCalculator from '@/components/common/TaxCalculator/TaxCalculator.vue'
import type { Meta, StoryFn } from '@storybook/vue3'

export default {
  title: 'Components/TaxCalculator',
  component: TaxCalculator
} as Meta<typeof TaxCalculator>

const Template: StoryFn<typeof TaxCalculator> = () => ({
  components: { TaxCalculator },
  template: '<TaxCalculator />'
})

export const Default = Template.bind({})
