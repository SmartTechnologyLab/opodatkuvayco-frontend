import type { Meta, StoryObj } from '@storybook/vue3'
import HelloWorld from '@/components/HelloWorld.vue'

const meta: Meta<typeof HelloWorld> = {
  component: HelloWorld
}

export default meta

type Story = StoryObj<typeof HelloWorld>

export const Default: Story = {
  render: () => ({
    components: { HelloWorld },
    template: `
      <HelloWorld />
    `
  })
}
