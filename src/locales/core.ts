import { createI18n } from 'vue-i18n'
import uaLocale from './ua.json'

export const i18n = createI18n({
  legacy: false,
  locale: 'ua',
  fallbackLocale: 'ua',
  messages: {
    ua: uaLocale
  }
})
