import type { Meta, StoryFn } from '@storybook/vue3'
import UiInput from './UiInput.vue'

export default {
  component: UiInput
} as Meta<typeof UiInput>

const Template: StoryFn<typeof UiInput> = () => ({
  components: { UiInput },
  template: '<UiInput />'
})

export const Default = Template.bind({})
