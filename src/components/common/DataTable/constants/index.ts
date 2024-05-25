import { FormatType, type TableHeaders } from '../types'

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
    type: FormatType.ExchangeUAH
  },
  {
    header: 'Покупка (грн)',
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
    type: FormatType.ExchangeUAH
  },
  {
    header: 'Продаж (грн)',
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
