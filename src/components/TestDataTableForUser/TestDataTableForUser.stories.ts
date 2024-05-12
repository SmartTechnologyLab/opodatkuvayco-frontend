import type { Meta, StoryFn } from '@storybook/vue3'
import TestDataTableForUser from './TestDataTableForUser.vue'

const meta: Meta<typeof TestDataTableForUser> = {
  component: TestDataTableForUser,
  render: (args) => ({
    components: { TestDataTableForUser },
    setup() {
      return { args }
    },
    template: `
      <DataTable v-bind="{...args }" />
    `
  })
}

export default meta

type StoryComponent = StoryFn<typeof TestDataTableForUser>

export const Default: StoryComponent = (args) => ({
  components: { TestDataTableForUser },
  setup() {
    return { args }
  },
  template: `
    <TestDataTableForUser v-bind="args" />
  `
})
