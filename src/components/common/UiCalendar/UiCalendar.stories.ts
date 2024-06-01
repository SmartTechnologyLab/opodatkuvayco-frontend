import type { Meta, StoryObj } from '@storybook/vue3'
import UiCalendar from './UiCalendar.vue'
import { DateFormat } from './types'

export default {
  component: UiCalendar,
  argTypes: {
    dateFormat: {
      control: 'radio',
      options: [undefined, ...Object.values(DateFormat)],
      description: 'Choose date format displayed'
    }
  }
} as Meta<typeof UiCalendar>

type Story = StoryObj<typeof UiCalendar>

export const Default: Story = {
  render: (args) => ({
    components: { UiCalendar },
    setup() {
      return { args }
    },
    data() {
      return {
        selectedDate: null
      }
    },
    template: `
      <UiCalendar v-bind="{...args}" v-model="selectedDate" />
    `
  })
}

export const FormattedDate: Story = {
  render: (args) => ({
    components: { UiCalendar },
    setup() {
      return { args }
    },
    data() {
      return {
        selectedDate: null
      }
    },
    template: `
      <UiCalendar v-bind="{...args}" v-model="selectedDate" />
    `
  }),
  args: {
    dateFormat: DateFormat.DOTTED
  }
}
