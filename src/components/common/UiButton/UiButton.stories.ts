import UiButton from './UiButton.vue'
import { Icons, Severities } from './constants'
import type { Meta, StoryFn } from '@storybook/vue3'

export default {
  component: UiButton,
  args: {
    hasSlot: false,
    label: 'Button',
    loading: false,
    disabled: false
  },
  argTypes: {
    onClick: { action: 'click' },
    icon: {
      control: 'radio',
      options: [undefined, ...Object.values(Icons)],
      description: 'Choose icon of the button'
    },
    severity: {
      control: 'radio',
      options: Object.values(Severities),
      description: 'Choose icon of the button'
    }
  }
} as Meta<typeof UiButton>

const Template: StoryFn<typeof UiButton> = (args) => ({
  components: { UiButton },
  setup() {
    return { args }
  },
  template: `<div>
    
    <UiButton v-if="args.hasSlot" v-bind="args">{{ $t(args.label) }}</UiButton>
    <UiButton v-else  v-bind="args" />
  </div>
  `
})

export const Default = Template.bind({})
Default.args = {
  icon: undefined,
  severity: Severities.SECONDARY,
  rounded: true,
  outlined: true,
  raised: true
}

export const Colors: StoryFn<typeof UiButton> = (args) => ({
  components: { UiButton },
  setup() {
    return { args, Severities }
  },
  template: `<div style="display: grid; gap: 8px; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));">
    <UiButton v-for="severity in Severities" :key="severity" v-bind="{ ...args, severity, label: severity}" />
  </div>`
})

export const Ico: StoryFn<typeof UiButton> = (args) => ({
  components: { UiButton },
  setup() {
    return { args, Icons }
  },
  template: `<div style="display: flex; gap: 8px;">
    <UiButton v-for="icon in Icons" :key="icon" v-bind="{ ...args, icon, label: ''}" />
  </div>`
})
