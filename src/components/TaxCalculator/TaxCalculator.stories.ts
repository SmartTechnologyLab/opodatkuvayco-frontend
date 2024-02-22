import TaxCalculator from '@/components/TaxCalculator/TaxCalculator.vue'

export default {
  title: 'Components/TaxCalculator',
  component: TaxCalculator
}

const Template = () => ({
  components: { TaxCalculator },
  template: '<TaxCalculator />'
})

export const Default = Template.bind({})
