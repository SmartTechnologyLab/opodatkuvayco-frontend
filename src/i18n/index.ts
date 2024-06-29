import { createI18n } from 'vue-i18n'
import uk from '@/i18n/locales/uk.json'
import { numberFormats } from '@/i18n/rules/numberFormats'
import { pluralRules } from '@/i18n/rules/pluralRules'
import { datetimeFormats } from '@/i18n/rules/datetimeFormats'

const defaultLocale = import.meta.env.VITE_DEFAULT_LOCALE || 'uk'
const fallbackLocale = import.meta.env.VITE_FALLBACK_LOCALE || 'uk'

export const i18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale: fallbackLocale,
  globalInjection: true,
  messages: {
    uk
  },
  numberFormats,
  pluralRules,
  datetimeFormats
})

export const _t = i18n.global.t
