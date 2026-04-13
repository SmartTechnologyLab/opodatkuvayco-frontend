import { i18n } from '@/i18n'
import type { App } from 'vue'
import PrimeVue from 'primevue/config'
import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'
import '@/assets/tailwind.css'
import '@/assets/main.scss'
import '@/assets/scss/styles/index.scss'

const AppPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#e6fff4',
      100: '#b3ffdc',
      200: '#80ffc4',
      300: '#4dffac',
      400: '#1affa5',
      500: '#0BFF84',
      600: '#10db9e',
      700: '#0bb280',
      800: '#088962',
      900: '#046044',
      950: '#023a29'
    },
    colorScheme: {
      dark: {
        surface: {
          0: '#ffffff',
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#9ca3af',
          500: '#4b5563',
          600: '#374151',
          700: '#1f2937',
          800: '#1a1e2d',
          900: '#111827',
          950: '#0b0f1a'
        },
        primary: {
          color: '#0BFF84',
          contrastColor: '#111827',
          hoverColor: '#10db9e',
          activeColor: '#0bb280'
        },
        highlight: {
          background: '#0BFF84',
          focusBackground: '#10db9e',
          color: '#111827',
          focusColor: '#111827'
        }
      }
    }
  }
})

export default (app: App<Element>) => {
  document.documentElement.classList.add('dark')
  app.use(i18n)
  app.use(PrimeVue, {
    ripple: true,
    theme: {
      preset: AppPreset,
      options: {
        darkModeSelector: '.dark'
      }
    }
  })
}
