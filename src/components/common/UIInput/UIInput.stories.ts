import type { Meta, StoryFn } from '@storybook/vue3'
import UIInput from './UIInput.vue'

export default {
  component: UIInput
} as Meta<typeof UIInput>

const Template: StoryFn<typeof UIInput> = () => ({
  components: { UIInput }
})

export const Default = Template.bind({})
