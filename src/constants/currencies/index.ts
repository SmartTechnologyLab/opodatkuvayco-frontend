export enum Currency {
  USD = 'USD',
  UAH = 'UAH',
  EUR = 'EUR'
}

export const currenciesSymbols: Record<Currency, string> = {
  [Currency.UAH]: '₴',
  [Currency.USD]: '$',
  [Currency.EUR]: '€'
}
