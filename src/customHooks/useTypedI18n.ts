import { useI18n } from 'vue-i18n'

export const useTypedI18n = () => {
  const { t, d } = useI18n()
  const $t: (key: string, params?: Record<string, number>) => string = t
  const $d: (date: Date, format: string, locale: string) => string = d

  return { $t, $d }
}
