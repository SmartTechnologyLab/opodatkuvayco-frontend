import dayjs from 'dayjs'
import { i18n } from '@/i18n'
import 'dayjs/locale/uk'
import { MONTH_NUMBERS } from '@/lib/dateUtils/consts/monthNumbers'
import { FULL_MONTH } from '@/lib/dateUtils/consts/dateFormats'

dayjs.locale(i18n.global.locale.value)

export const getMonthNumber = (date: Date) => {
  return dayjs(date).month()
}

export const getMonthNameByNumber = (date: Date) => {
  const monthNumber = getMonthNumber(date)

  return dayjs().month(monthNumber).format('MMMM')
}

export const getMonthes = (): string[] =>
  MONTH_NUMBERS.map((monthNumber) => dayjs().month(monthNumber).format(FULL_MONTH))

export const getMonthesMap = () => {
  const monthes = [...getMonthes()]

  return monthes.reduce(
    (acc, month) => {
      acc[month] = []

      return acc
    },
    {} as Record<string, any>
  )
}
