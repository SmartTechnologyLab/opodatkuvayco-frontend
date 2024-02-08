import { config } from '@vue/test-utils'
import { vi } from 'vitest'

vi.mock('vue-i18n', () => ({
  useI18n: () => ({
    t: (key: string) => key,
    d: (key: string) => key
  })
}))

config.global.mocks = {
  $t: (msg: string) => msg,
  $d: (date: Date) => date,
  $n: (num: number) => num
}
