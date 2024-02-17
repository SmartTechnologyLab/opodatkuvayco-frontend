import { i18n } from '@/i18n'
import type { App } from 'vue'

export default (app: App<Element>) => {
  app.use(i18n)
}
