import { createI18n } from 'vue-i18n'
import uaLocale from '@/locales/ua.json'
import { numbersFormats } from '@/locales/rules/numbersFormats'
import { pluralizationRules } from '@/locales/rules/pluralizationRules'

const defaultLocale = 'uk'
export const i18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale: defaultLocale,
  messages: {
    [defaultLocale]: uaLocale
  },
  numberFormats: numbersFormats,
  pluralRules: pluralizationRules
})
