import type { Preview } from '@storybook/vue3'
import { setup } from '@storybook/vue3'
import generalConfig from '../src/config'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on.*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
}

setup((app) => {
  generalConfig(app)
})

export default preview
