import type { Meta, StoryFn } from '@storybook/vue3'
import UiTextInput from './UiTextInput.vue'
import FloatLabel from 'primevue/floatlabel'

export default {
  component: UiTextInput,
  args: {
    invalid: false,
    disabled: false,
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
} as Meta<typeof UiTextInput>

const Template: StoryFn<typeof UiTextInput> = (args) => ({
  components: { UiTextInput },
  setup() {
    return { args }
  },
  template: `
    <UiTextInput v-bind="args" />
  `
})

export const Default = Template.bind({})

const InputWithLabel: StoryFn<typeof UiTextInput> = (args) => ({
  components: { UiTextInput, FloatLabel },
  setup() {
    return { args }
  },
  template: `
    <div>
      <FloatLabel>
        <UiTextInput id="name" v-bind="args" placeholder='' />
        <label for="name">{{ args.label }}</label>
      </FloatLabel>
    </div>
  `
})

export const WithLabel = InputWithLabel.bind({})
