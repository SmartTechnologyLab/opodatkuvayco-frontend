import { config } from '@vue/test-utils'
import { vi } from 'vitest'

vi.mock('vue-i18n', () => ({
  useI18n: () => ({
    t: (key: string) => key,
    d: (date: Date) => date,
    n: (num: number) => '%' + num + ' USD'
  })
}))

config.global.mocks = {
  $t: (msg: string) => msg,
  $d: (date: Date) => date,
  $n: (num: number) => num + ' USD'
}
