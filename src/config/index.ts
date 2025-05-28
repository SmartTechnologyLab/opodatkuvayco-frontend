import { i18n } from '@/i18n'
import type { App } from 'vue'
import PrimeVue from 'primevue/config'
import '@/assets/main.scss'
import 'primevue/resources/themes/aura-dark-green/theme.css'
import '@/assets/scss/styles/index.scss'

export default (app: App<Element>) => {
  app.use(i18n)
  app.use(PrimeVue, {
    ripple: true,
    theme: {
      dark: true,
      colors: {
        // базові
        primary: '#0BFF84', // neon-green (DemoSection)
        surface: '#1a1e2d', // bg-gray-900
        'surface-card': '#1f2937', // bg-gray-800
        'surface-section': '#1a1e2d', // bg-gray-900
        'surface-border': '#374151', // border-gray-700

        // тексти
        text: '#ffffff', // білий
        'text-secondary': '#9ca3af', // text-gray-400

        // акцентні стани
        'highlight-bg': '#0BFF84', // neon-green для активних/вибраних
        'highlight-text': '#111827', // text-gray-900 для світлого тексту на акцентному фоні
        'hover-bg': '#4b5563' // bg-gray-600 для hover
      }
    }
  })
}
