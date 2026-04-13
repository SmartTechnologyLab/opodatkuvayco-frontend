import { TableSize } from '@/components/TestDataTableForUser/common/constants'
import type { TableHeaders } from '../types'
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

export const currenciesName: Record<Currency, Currency> = {
  [Currency.UAH]: Currency.UAH,
  [Currency.USD]: Currency.USD,
  [Currency.EUR]: Currency.EUR
}

export const resultHeaders: TableHeaders[] = [
  {
    header: 'Тікер',
    field: 'ticker',
    size: [TableSize.LG, TableSize.SM],
    sortable: true
  },
  {
    header: 'Дата покупки',
    field: 'purchase.date',
    type: FormatType.Date,
    size: [TableSize.LG],
    sortable: true
  },
  {
    header: 'Кількість',
    field: 'quantity',
    type: FormatType.Number,
    size: [TableSize.LG],
    sortable: true
  },
  {
    header: 'Ціна',
    field: 'purchase.price',
    type: FormatType.CurrencyUSD,
    size: [TableSize.LG],
    sortable: true
  },
  {
    header: 'Сума',
    field: 'purchase.sum',
    type: FormatType.CurrencyUSD,
    size: [TableSize.LG],
    sortable: true
  },
  {
    header: 'Комісія',
    field: 'purchase.commission',
    type: FormatType.CurrencyUSD,
    size: [TableSize.LG],
    sortable: true
  },
  {
    header: 'Курс',
    field: 'purchase.rate',
    type: FormatType.CurrencyUAH,
    size: [TableSize.LG],
    sortable: true
  },
  {
    header: 'Покупка',
    field: 'purchase.uah',
    type: FormatType.CurrencyUAH,
    size: [TableSize.LG, TableSize.SM],
    sortable: true
  },
  {
    header: 'Дата продажу',
    field: 'sale.date',
    type: FormatType.Date,
    size: [TableSize.LG],
    sortable: true
  },
  {
    header: 'Ціна',
    field: 'sale.price',
    type: FormatType.CurrencyUSD,
    size: [TableSize.LG],
    sortable: true
  },
  {
    header: 'Сума',
    field: 'sale.sum',
    type: FormatType.CurrencyUSD,
    size: [TableSize.LG],
    sortable: true
  },
  {
    header: 'Комісія',
    field: 'sale.commission',
    type: FormatType.CurrencyUSD,
    size: [TableSize.LG],
    sortable: true
  },
  {
    header: 'Курс',
    field: 'sale.rate',
    type: FormatType.CurrencyUAH,
    size: [TableSize.LG],
    sortable: true
  },
  {
    header: 'Продаж',
    field: 'sale.uah',
    type: FormatType.CurrencyUAH,
    size: [TableSize.LG, TableSize.SM],
    sortable: true
  },
  {
    header: 'Всього',
    field: 'total',
    type: FormatType.CurrencyUAH,
    size: [TableSize.LG, TableSize.SM],
    sortable: true
  },
  {
    header: '%',
    field: 'percent',
    type: FormatType.Percent,
    size: [TableSize.LG],
    sortable: true
  }
]
