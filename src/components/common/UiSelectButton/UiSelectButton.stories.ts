import type { Meta, StoryObj } from '@storybook/vue3'
import UiSelectButton from '@/components/common/UiSelectButton/UiSelectButton.vue'
import { Currency } from '../UiNumberInput/types'

export default {
  component: UiSelectButton,
  args: {
    options: Object.values(Currency),
    allowEmpty: false
  }
} as Meta<typeof UiSelectButton>

type Story = StoryObj<typeof UiSelectButton>

export const Default: Story = {
  render: (args) => ({
    components: { UiSelectButton },
    setup() {
      return { args }
    },
    data() {
      return {
        selectedOption: Currency.UAH
      }
    },
    template: `
      <UiSelectButton v-bind="{ ...args }" v-model="selectedOption" :allow-empty="args.allowEmpty" />
    `
  })
}
