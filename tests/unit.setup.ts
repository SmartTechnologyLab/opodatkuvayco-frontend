import { config } from '@vue/test-utils'
import { i18n } from '../src/i18n'

// Set timezone to ensure consistent date formatting across environments
process.env.TZ = 'Europe/Kiev'

config.global.mocks = {
  $t: (msg: string) => msg,
  $d: (date: Date) => date,
  $n: (num: number) => num
}

config.global.plugins = [i18n]

config.global.renderStubDefaultSlot = true
