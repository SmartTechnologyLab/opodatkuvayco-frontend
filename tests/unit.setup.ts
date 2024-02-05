import { config } from '@vue/test-utils'

config.global.mocks = {
  $t: (msg: string) => msg,
  $d: (date: Date) => date,
  $n: (num: number) => num
}
