import type { TableHeaders, Currencies } from '../types'
import { Currency } from '@/constants/currencies'

export enum FormatType {
  Date,
  Number,
  CurrencyUAH,
  CurrencyUSD,
  CurrencyEUR,
  Percent
}

export const dynamicCurrencies = [FormatType.CurrencyUSD, FormatType.CurrencyEUR]

export const currenciesName: Record<Currencies, Currency> = {
  [FormatType.CurrencyUAH]: Currency.UAH,
  [FormatType.CurrencyUSD]: Currency.USD,
  [FormatType.CurrencyEUR]: Currency.EUR
}

export const resultHeaders: TableHeaders[] = [
  {
    header: 'Тікер',
    field: 'ticker'
  },
  {
    header: 'Дата покупки',
    field: 'purchase.date',
    type: FormatType.Date
  },
  {
    header: 'Кількість',
    field: 'quantity',
    type: FormatType.Number
  },
  {
    header: 'Ціна',
    field: 'purchase.price',
    type: FormatType.CurrencyUSD
  },
  {
    header: 'Сума',
    field: 'purchase.sum',
    type: FormatType.CurrencyUSD
  },
  {
    header: 'Комісія',
    field: 'purchase.commission',
    type: FormatType.CurrencyUSD
  },
  {
    header: 'Курс',
    field: 'purchase.rate',
    type: FormatType.CurrencyUAH
  },
  {
    header: 'Покупка',
    field: 'purchase.uah',
    type: FormatType.CurrencyUAH
  },
  {
    header: 'Дата продажу',
    field: 'sale.date',
    type: FormatType.Date
  },
  {
    header: 'Ціна',
    field: 'sale.price',
    type: FormatType.CurrencyUSD
  },
  {
    header: 'Сума',
    field: 'sale.sum',
    type: FormatType.CurrencyUSD
  },
  {
    header: 'Комісія',
    field: 'sale.commission',
    type: FormatType.CurrencyUSD
  },
  {
    header: 'Курс',
    field: 'sale.rate',
    type: FormatType.CurrencyUAH
  },
  {
    header: 'Продаж',
    field: 'sale.uah',
    type: FormatType.CurrencyUAH
  },
  {
    header: 'Всього',
    field: 'total',
    type: FormatType.CurrencyUAH
  },
  {
    header: '%',
    field: 'percent',
    type: FormatType.Percent
  }
]
