import type { TableSize } from '@/components/TestDataTableForUser/common/constants'
import type { Currency } from '@/constants/currencies'
import { FormatType } from 'src/components/common/DataTable/constants'

export interface TableHeaders {
  header: string
  field: string
  type?: FormatType
  size?: TableSize[]
}

export interface Table {
  headers: TableHeaders[]
  data: any[]
}

export type Currencies = Currency.EUR | Currency.UAH | Currency.USD
