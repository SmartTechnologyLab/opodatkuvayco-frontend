import dayjs from 'dayjs'
import { i18n } from '@/i18n'
import 'dayjs/locale/uk'

dayjs.locale(i18n.global.locale.value)

export const getMonthNumber = (date: Date) => {
  return dayjs(date).month()
}

export const getMonthNameByNumber = (date: Date) => {
  const monthNumber = getMonthNumber(date)

  return dayjs().month(monthNumber).format('MMMM')
}

const monthNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

export const getMonthes = (): string[] => {
  return monthNumbers.map((monthNumber) => {
    return dayjs().month(monthNumber).format('MMMM')
  })
}

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
