export enum FormatType {
  Date,
  Number,
  CurrencyUAH,
  CurrencyUSD,
  Percent
}

export interface TableHeaders {
  header: string
  field: string
  type?: FormatType
}

export interface Table {
  headers: TableHeaders[]
  data: any[]
}
