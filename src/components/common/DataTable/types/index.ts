import { FormatType } from 'src/components/common/DataTable/constants'

export interface TableHeaders {
  header: string
  field: string
  type?: FormatType
}

export interface Table {
  headers: TableHeaders[]
  data: any[]
}
export type Currencies = FormatType.CurrencyUAH | FormatType.CurrencyUSD | FormatType.CurrencyEUR
