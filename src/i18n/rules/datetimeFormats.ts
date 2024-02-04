import type { I18nOptions } from 'vue-i18n'

export const datetimeFormats: I18nOptions['datetimeFormats'] = {
  uk: {
    short: {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    },
    long: {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric'
    }
  }
}
