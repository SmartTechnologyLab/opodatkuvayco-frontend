import type { Meta, StoryObj } from '@storybook/vue3'
import DataTable from './DataTable.vue'

const meta: Meta<typeof DataTable> = {
  component: DataTable
}

export default meta

type Story = StoryObj<typeof DataTable>

export const Default: Story = {
  render: () => ({
    components: { DataTable },
    template: `
      <DataTable />
    `
  })
}
