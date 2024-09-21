export type Deal = {
  id: symbol
  percent: number
  purchase: {
    date: Date
    price: number
    sum: number
    commission: number
    rate: number
    uah: number
  }
  quantity: number
  sale: {
    date: Date
    price: number
    sum: number
    commission: number
    rate: number
    uah: number
  }
  ticker: string
  total: number
}

export type Operation = 'sale' | 'purchase'

type DealOptions = {
  purchaseCommission?: number
  purchaseDate?: Date
  purchasePrice?: number
  purchaseRate?: number
  quantity?: number
  saleCommission?: number
  saleDate?: Date
  salePrice?: number
  saleRate?: number
  ticker?: string
}

const tickers = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'FB']

const randomDate = (start: Date, end: Date): Date => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

const randomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const getDeal = ({
  ticker,
  quantity,
  purchaseCommission,
  purchaseDate,
  purchasePrice,
  purchaseRate,
  saleCommission,
  saleDate,
  salePrice,
  saleRate
}: DealOptions = {}): Deal => {
  const _quantity = quantity || randomNumber(1, 50)
  const _salePrice = salePrice || randomNumber(10, 100)
  const _saleRate = saleRate || randomNumber(25, 40)
  const _purchasePrice = purchasePrice || randomNumber(10, 100)
  const _purchaseRate = purchaseRate || randomNumber(25, 40)

  // Computed data
  const purchaseSum = _purchasePrice * _quantity
  const _purchaseCommission = purchaseCommission || purchaseSum * randomNumber(0.01, 0.1)
  const saleSum = _salePrice * _quantity
  const _saleCommission = saleCommission || saleSum * randomNumber(0.01, 0.1)
  const purchaseUah = (purchaseSum + _purchaseCommission) * _purchaseRate + _saleCommission * _saleRate
  const saleUah = saleSum * _saleRate

  return {
    id: Symbol(),
    purchase: {
      commission: _purchaseCommission,
      date: purchaseDate || randomDate(new Date(2020, 0, 1), new Date()),
      price: _purchasePrice,
      rate: _purchaseRate,
      sum: purchaseSum,
      uah: purchaseUah
    },
    quantity: _quantity,
    sale: {
      commission: _saleCommission,
      date: saleDate || randomDate(new Date(2020, 0, 1), new Date()),
      price: _salePrice,
      rate: _saleRate,
      sum: saleSum,
      uah: saleUah
    },
    ticker: ticker || tickers[Math.floor(Math.random() * tickers.length)],
    total: saleUah - purchaseUah,
    percent: saleUah / purchaseUah - 1
  }
}
