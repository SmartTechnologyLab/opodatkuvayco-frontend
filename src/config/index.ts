import { i18n } from '@/i18n'
import type { App } from 'vue'
import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/aura-dark-green/theme.css'

export default (app: App<Element>) => {
  app.use(i18n)
  app.use(PrimeVue)
}
