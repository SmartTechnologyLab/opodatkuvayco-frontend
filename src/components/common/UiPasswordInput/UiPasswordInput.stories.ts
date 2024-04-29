import type { Meta, StoryFn } from '@storybook/vue3'
import UiPasswordInput from './UiPasswordInput.vue'
import FloatLabel from 'primevue/floatlabel'

export default {
  component: UiPasswordInput,
  args: {
    invalid: false,
    disabled: false,
    toggleMask: false,
    label: 'Password',
    variant: 'default',
    placeholder: 'Password'
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['default', 'filled'],
      description: 'Choose the variant of filled input'
    }
  }
} as Meta<typeof UiPasswordInput>

const Template: StoryFn<typeof UiPasswordInput> = (args) => ({
  components: { UiPasswordInput },
  setup() {
    return { args }
  },
  template: `
    <div style="display: flex; justify-content: center;">
      <UiPasswordInput v-bind="args" />
    </div>
  `
})

export const Default = Template.bind({})

const InputWithLabel: StoryFn<typeof UiPasswordInput> = (args) => ({
  components: { UiPasswordInput, FloatLabel },
  setup() {
    return { args }
  },
  template: `
    <div style="display: flex; justify-content: center;">
      <FloatLabel>
        <UiPasswordInput id="test" />
        <label for="test">{{args.label}}</label>
      </FloatLabel>
    </div>
  `
})

export const WithLabel = InputWithLabel.bind({})
