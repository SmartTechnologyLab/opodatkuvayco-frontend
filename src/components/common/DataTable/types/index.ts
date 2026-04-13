import type { TableSize } from '@/components/TestDataTableForUser/common/constants'
import type { Currency } from '@/constants/currencies'
import { FormatType } from '@/components/common/DataTable/constants'

export interface TableHeaders {
  header: string
  field: string
  type?: FormatType
  size?: TableSize[]
  sortable?: boolean
}

export interface Table {
  headers: TableHeaders[]
  data: unknown[]
}

export type Currencies = Currency.EUR | Currency.UAH | Currency.USD

export interface Dividend {
  id: string
  date: string
  ticker: string
  isin: string
  currency: string
  amount: number
  amountPerOne: number
  quantity: number
  externalTax: number
  externalTaxCurrency: string
  rate: number
  amountUah: number
  externalTaxUah: number
}

export interface DividendsReport {
  dividends: Dividend[]
  totalAmountUah: number
  pdfo: number
  militaryFee: number
}
