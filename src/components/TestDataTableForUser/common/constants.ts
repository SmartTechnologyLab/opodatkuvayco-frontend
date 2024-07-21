import { Currency } from '@/constants/currencies'

export const notEditableColumns: string[] = [
  'total',
  'percent',
  'sale.uah',
  'sale.sum',
  'purchase.uah',
  'sale.uah',
  'purchase.sum',
  'sale.rate',
  'purchase.rate'
]

export enum TableSize {
  LG = 'lg',
  SM = 'sm'
}

export const currencyOptions = Object.values(Currency).filter((currency) => currency !== Currency.UAH)

export const tableSizeOptions = Object.values(TableSize)
