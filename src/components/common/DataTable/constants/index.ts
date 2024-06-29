import { _t } from '@/i18n'
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
    header: _t('table.headers.ticker'),
    field: 'ticker'
  },
  {
    header: _t('table.headers.purchase-date'),
    field: 'purchase.date',
    type: FormatType.Date
  },
  {
    header: _t('table.headers.quantity'),
    field: 'quantity',
    type: FormatType.Number
  },
  {
    header: _t('table.headers.purchase'),
    field: 'purchase.price',
    type: FormatType.CurrencyUSD
  },
  {
    header: _t('table.headers.sum'),
    field: 'purchase.sum',
    type: FormatType.CurrencyUSD
  },
  {
    header: _t('table.headers.comission'),
    field: 'purchase.commission',
    type: FormatType.CurrencyUSD
  },
  {
    header: _t('table.headers.rate'),
    field: 'purchase.rate',
    type: FormatType.CurrencyUAH
  },
  {
    header: _t('table.headers.purchase'),
    field: 'purchase.uah',
    type: FormatType.CurrencyUAH
  },
  {
    header: _t('table.headers.sale-date'),
    field: 'sale.date',
    type: FormatType.Date
  },
  {
    header: _t('table.headers.price'),
    field: 'sale.price',
    type: FormatType.CurrencyUSD
  },
  {
    header: _t('table.headers.sum'),
    field: 'sale.sum',
    type: FormatType.CurrencyUSD
  },
  {
    header: _t('table.headers.comission'),
    field: 'sale.commission',
    type: FormatType.CurrencyUSD
  },
  {
    header: _t('table.headers.rate'),
    field: 'sale.rate',
    type: FormatType.CurrencyUAH
  },
  {
    header: _t('table.headers.sale'),
    field: 'sale.uah',
    type: FormatType.CurrencyUAH
  },
  {
    header: _t('table.headers.total'),
    field: 'total',
    type: FormatType.CurrencyUAH
  },
  {
    header: _t('table.headers.percent'),
    field: 'percent',
    type: FormatType.Percent
  }
]
