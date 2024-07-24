import { getCurrencyExchange } from '@/api/getCurrencyExchange'
import type { Deal } from '@/components/common/DataTable/mocks'
import type { Currency } from '@/constants/currencies'
import { clone } from 'ramda'

export const groupAndSumByTicker = (deals: Deal[]) => {
  const copyDeals = clone(deals) as Deal[]

  const grouped = copyDeals.reduce(
    (acc, deal) => {
      if (!acc[deal.ticker]) {
        acc[deal.ticker] = deal
      } else {
        acc[deal.ticker].sale.uah += deal.sale.uah
        acc[deal.ticker].purchase.uah += deal.purchase.uah
        acc[deal.ticker].total += deal.total
      }

      return acc
    },
    {} as Record<string, Deal>
  )

  return Object.values(grouped)
}

export const recalculateDeal = (dealParam: Deal) => {
  const deal = clone(dealParam)

  deal.purchase.sum = deal.purchase.price * deal.quantity
  deal.sale.sum = deal.sale.price * deal.quantity
  deal.purchase.uah =
    (deal.purchase.sum + deal.purchase.commission) * deal.purchase.rate + deal.sale.commission * deal.sale.rate
  deal.sale.uah = deal.sale.sum * deal.sale.rate
  deal.total = deal.sale.uah - deal.purchase.uah
  deal.percent = deal.sale.uah / deal.purchase.uah - 1

  return deal
}

export const updatedDealRates = async (deals: Deal[], originalDeals: Deal[], currency: Currency) => {
  const dealsWithNewRate = await Promise.all(
    deals.map(async (deal) => {
      const [purchase, sale] = await Promise.all([
        getCurrencyExchange(currency, String(deal.purchase.date)),
        getCurrencyExchange(currency, String(deal.sale.date))
      ])

      deal.purchase.rate = purchase.rate
      deal.sale.rate = sale.rate

      return recalculateDeal(deal)
    })
  )

  return dealsWithNewRate
}
