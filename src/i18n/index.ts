import { createI18n } from 'vue-i18n'
import uk from '@/i18n/locales/uk.json'
import { numbersFormats } from '@/i18n/rules/numbersFormats'
import { pluralRules } from '@/i18n/rules/pluralRules'
import { datetimeFormats } from '@/i18n/rules/datetimeFormats'

const defaultLocale = import.meta.env.VITE_DEFAULT_LOCALE
const fallbackLocale = import.meta.env.VITE_FALLBACK_LOCALE

export const i18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale: fallbackLocale,
  globalInjection: true,
  messages: {
    uk
  },
  numbersFormats,
  pluralRules,
  datetimeFormats
})
