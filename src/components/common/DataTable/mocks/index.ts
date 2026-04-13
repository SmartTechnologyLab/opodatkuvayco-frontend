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

const MILITARY_RATE = !isNaN(parseFloat(import.meta.env.VITE_MILITARY_RATE))
  ? parseFloat(import.meta.env.VITE_MILITARY_RATE)
  : 0.05 // 5% (збігається з UI MILITARY_RATE_PCT)
const TAX_RATE = !isNaN(parseFloat(import.meta.env.VITE_TAX_RATE)) ? parseFloat(import.meta.env.VITE_TAX_RATE) : 0.18 // 18% (збігається з UI TAX_RATE_PCT)

const TAX_FREE_THRESHOLD = !isNaN(parseFloat(import.meta.env.VITE_TAX_FREE_THRESHOLD_UAH))
  ? parseFloat(import.meta.env.VITE_TAX_FREE_THRESHOLD_UAH)
  : 4240 // Default: 3028 × 1.4 = 4240 UAH on 2025

if (import.meta.env.DEV) {
  console.debug(`Military Rate: ${MILITARY_RATE}, Tax Rate: ${TAX_RATE}, Tax-free threshold: ${TAX_FREE_THRESHOLD}`)
}
// const DIVIDEND_RATE = parseFloat(import.meta.env.VITE_DIVIDEND_RATE)

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

import type { Dividend, DividendsReport } from '@/components/common/DataTable/types'

export const getDividendsReport = (): DividendsReport => {
  const dividends: Dividend[] = [
    {
      id: 'b574fc8b',
      date: '2021-07-02T00:00:00.000Z',
      ticker: 'KO.US',
      isin: 'US1912161007',
      currency: 'USD',
      amount: 0.59,
      amountPerOne: 0.42,
      quantity: 2,
      externalTax: 0,
      externalTaxCurrency: 'USD',
      rate: 27.3841,
      amountUah: 16.156619,
      externalTaxUah: 0
    },
    {
      id: 'ee2f999d',
      date: '2021-09-10T00:00:00.000Z',
      ticker: 'MSFT.US',
      isin: 'US5949181045',
      currency: 'USD',
      amount: 0.39,
      amountPerOne: 0.56,
      quantity: 1,
      externalTax: 0,
      externalTaxCurrency: 'USD',
      rate: 26.7264,
      amountUah: 10.423296,
      externalTaxUah: 0
    },
    {
      id: 'a2e19c4b',
      date: '2021-09-25T00:00:00.000Z',
      ticker: 'HOG.US',
      isin: 'US4128221086',
      currency: 'USD',
      amount: 1.05,
      amountPerOne: 0.15,
      quantity: 10,
      externalTax: 0,
      externalTaxCurrency: 'USD',
      rate: 26.5272,
      amountUah: 27.85356,
      externalTaxUah: 0
    },
    {
      id: 'e4546b1a',
      date: '2021-10-01T00:00:00.000Z',
      ticker: 'PEP.US',
      isin: 'US7134481081',
      currency: 'USD',
      amount: 0.76,
      amountPerOne: 1.075,
      quantity: 1,
      externalTax: 0,
      externalTaxCurrency: 'USD',
      rate: 26.6175,
      amountUah: 20.2293,
      externalTaxUah: 0
    },
    {
      id: '46535472',
      date: '2021-10-05T00:00:00.000Z',
      ticker: 'KO.US',
      isin: 'US1912161007',
      currency: 'USD',
      amount: 1.76,
      amountPerOne: 0.42,
      quantity: 6,
      externalTax: 0,
      externalTaxCurrency: 'USD',
      rate: 26.5722,
      amountUah: 46.767072,
      externalTaxUah: 0
    },
    {
      id: '48bd4784',
      date: '2021-12-10T00:00:00.000Z',
      ticker: 'MSFT.US',
      isin: 'US5949181045',
      currency: 'USD',
      amount: 0.43,
      amountPerOne: 0.62,
      quantity: 1,
      externalTax: 0,
      externalTaxCurrency: 'USD',
      rate: 27.1013,
      amountUah: 11.653559,
      externalTaxUah: 0
    }
  ]
  const DIVIDEND_RATE = !isNaN(parseFloat(import.meta.env.VITE_DIVIDEND_RATE))
    ? parseFloat(import.meta.env.VITE_DIVIDEND_RATE)
    : 0.09
  const MIL_RATE = !isNaN(parseFloat(import.meta.env.VITE_MILITARY_RATE))
    ? parseFloat(import.meta.env.VITE_MILITARY_RATE)
    : 0.05
  const totalAmountUah = dividends.reduce((acc, d) => acc + d.amountUah, 0)
  return {
    dividends,
    totalAmountUah,
    pdfo: totalAmountUah * DIVIDEND_RATE,
    militaryFee: totalAmountUah * MIL_RATE
  }
}

export const getReport = (
  deals: Deal[]
): { total: number; totalMilitaryFee: number; totalTaxFee: number; isTaxFree: boolean } => {
  const total = deals.reduce((acc, deal) => acc + deal.total, 0)
  // Інвестиційний прибуток не оподатковується, якщо сумарно не перевищує поріг (прожитковий мінімум × 1.4).
  const isTaxable = total > TAX_FREE_THRESHOLD
  const totalMilitaryFee = isTaxable ? total * MILITARY_RATE : 0
  const totalTaxFee = isTaxable ? total * TAX_RATE : 0

  return {
    total,
    totalMilitaryFee,
    totalTaxFee,
    isTaxFree: total > 0 && !isTaxable
  }
}
