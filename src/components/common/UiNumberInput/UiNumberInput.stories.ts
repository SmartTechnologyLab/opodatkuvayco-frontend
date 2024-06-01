import type { Meta, StoryObj } from '@storybook/vue3'
import UiNumberInput from './UiNumberInput.vue'
import { Currency } from './types'

export default {
  component: UiNumberInput,
  args: {
    mode: undefined,
    minFractionDigits: 0,
    maxFractionDigits: 0,
    preffix: '',
    suffix: ''
  },
  argTypes: {
    mode: {
      control: 'radio',
      options: ['currency', 'decimal', undefined],
      description: 'Choose mode of input'
    },
    currency: {
      control: 'radio',
      options: [undefined, ...Object.values(Currency)]
    },
    preffix: {
      control: 'text'
    },
    suffix: {
      control: 'text'
    },
    minFractionDigits: {
      control: 'range'
    },
    maxFractionDigits: {
      control: 'range'
    }
  }
} as Meta<typeof UiNumberInput>

type Story = StoryObj<typeof UiNumberInput>

export const Default: Story = {
  render: (args) => ({
    components: { UiNumberInput },
    setup() {
      return { args }
    },
    template: `
      <UiNumberInput v-bind="{...args}" />
    `
  })
}

export const CurrencyInput: Story = {
  render: (args) => ({
    components: { UiNumberInput },
    setup() {
      return { args }
    },
    template: `
      <UiNumberInput v-bind="{...args}" />
    `
  }),
  args: {
    mode: 'currency',
    currency: Currency.USD
  }
}

export const InputWithSuffix: Story = {
  render: (args) => ({
    components: { UiNumberInput },
    setup() {
      return { args }
    },
    template: `
      <UiNumberInput v-bind="{...args}" />
    `
  }),
  args: {
    suffix: '%'
  }
}
