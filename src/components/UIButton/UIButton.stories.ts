import UIButton from './UIButton.vue'
import { Icons, Severities } from './constants'
import type { Meta, StoryFn } from '@storybook/vue3'

export default {
  component: UIButton,
  argTypes: {
    icon: {
      control: 'radio',
      options: Object.values(Icons),
      description: 'Choose icon of the button'
    },
    severity: {
      control: 'radio',
      options: Object.values(Severities),
      description: 'Choose icon of the button'
    }
  }
} as Meta<typeof UIButton>

const Template: StoryFn<typeof UIButton> = (args) => ({
  components: { UIButton },
  setup() {
    return { args }
  },
  template: `<UIButton v-bind="args" />`
})

export const Default = Template.bind({})
Default.args = {
  icon: Icons.CHECK,
  severity: Severities.SECONDARY,
  rounded: true,
  outlined: true,
  raised: true
}
