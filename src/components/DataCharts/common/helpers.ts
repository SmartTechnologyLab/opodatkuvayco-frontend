import type { Deal, Operation } from '@/components/common/DataTable/mocks'
import type { ChartData } from '@/components/common/UiChart/common/types'
import { getMonthesMap, getMonthNameByNumber } from '@/lib/dateUtils'
import type { NestedKeyOf } from '@/lib/types/nestedKeyOf'
import { pipe, curry, path } from 'ramda'

const groupDealsByMonth = curry((operation: Operation, deals: Deal[]) => {
  return deals.reduce(
    (acc, deal) => {
      const month = getMonthNameByNumber(deal[operation].date)

      if (!acc[month]) {
        acc[month] = []
      }

      acc[month].push(deal)

      return acc
    },
    {} as Record<string, Deal[]>
  )
})

const groupDealsWithMonthMap = curry((operation: Operation, deals: Deal[]) => {
  return deals.reduce(
    (acc, deal) => {
      const monthesMap = getMonthesMap()
      const month = getMonthNameByNumber(deal[operation].date)

      if (!acc[deal.ticker]) {
        acc[deal.ticker] = monthesMap
      }

      acc[deal.ticker][month].push(deal)

      return acc
    },
    {} as Record<string, Record<string, Deal[]>>
  )
})

const groupPurchaseByTicker = (deals: Deal[]): Record<string, Deal[]> => {
  return deals.reduce(
    (acc, deal) => {
      if (!acc[deal.ticker]) {
        acc[deal.ticker] = []
      }

      acc[deal.ticker].push(deal)

      return acc
    },
    {} as Record<string, Deal[]>
  )
}

const sumDealsPropertyByEachMonth = curry(
  (
    dealProperty: NestedKeyOf<Deal>,
    dealsMap: Record<string, Record<string, Deal[]>>
  ): Record<string, Record<string, number>> => {
    const result: Record<string, Record<string, number>> = {}

    for (const key in dealsMap) {
      for (const month in dealsMap[key]) {
        if (!result[key]) {
          result[key] = {}
        }

        if (!dealsMap[key][month].length) {
          result[key][month] = 0
        } else {
          result[key][month] = dealsMap[key][month].reduce((acc, deal) => acc + path(dealProperty.split('.'), deal), 0)
        }
      }
    }

    return result
  }
)

const getFilteredMonthsWithTrades = (dealsByMonthMap: Record<string, Record<string, number>>) => {
  const monthes: string[] = []

  for (const key in dealsByMonthMap) {
    const dealsByMonthMapEntries = Object.entries(dealsByMonthMap[key])

    dealsByMonthMapEntries.forEach(([month], currentIndx) => {
      if (!!dealsByMonthMap[key][month] && !monthes.includes(month)) {
        monthes.push(month)
      } else if (
        Object.values(dealsByMonthMap[key]).some((value, index) => value > 0 && index > currentIndx) &&
        !monthes.includes(month)
      ) {
        monthes.push(month)
      }
    })
  }

  return monthes
}

const resultArrayOfDealsByEachMonth = (dealsMap: Record<string, Record<string, number>>): ChartData => {
  const dataSet = []

  for (const key in dealsMap) {
    const data = []

    for (const month in dealsMap[key]) {
      data.push(dealsMap[key][month])
    }

    dataSet.push({
      label: key,
      data
    })
  }

  return {
    labels: getFilteredMonthsWithTrades(dealsMap),
    datasets: dataSet
  }
}

const getAllTickersValue = (deals: Deal[]) => {
  return deals.reduce((acc, deal) => {
    if (!acc.includes(deal.ticker)) {
      acc.push(deal.ticker)
    }

    return acc
  }, [] as string[])
}

const sumDealValues = curry(
  (dealProperty: NestedKeyOf<Deal>, dealsMap: Record<string, Deal[]>): Record<string, number> => {
    const result: Record<string, number> = {}

    for (const key in dealsMap) {
      result[key] = dealsMap[key].reduce((acc, deal) => acc + path(dealProperty.split('.'), deal), 0)
    }

    return result
  }
)

const getAverageValue = (groupedDeals: Record<string, number>): Record<string, number> => {
  const totalValue = Object.values(groupedDeals).reduce((acc, curr) => acc + curr, 0)

  const dealsAverageMap: Record<string, number> = {}

  for (const key in groupedDeals) {
    dealsAverageMap[key] = +(groupedDeals[key] / totalValue).toFixed(2) * 100
  }

  return dealsAverageMap
}

const getTradesPercentageResultByTicker = (dealProperty: NestedKeyOf<Deal>) =>
  pipe(groupPurchaseByTicker, sumDealValues(dealProperty), getAverageValue)

const getResultByTickerEachMonth = (operation: Operation, dealProperty: NestedKeyOf<Deal>) =>
  pipe(groupDealsWithMonthMap(operation), sumDealsPropertyByEachMonth(dealProperty), resultArrayOfDealsByEachMonth)

const getRevenueByPurchaseMonth = (operation: Operation, dealProperty: NestedKeyOf<Deal>) =>
  pipe(groupDealsByMonth(operation), sumDealValues(dealProperty))

export { getTradesPercentageResultByTicker, getRevenueByPurchaseMonth, getAllTickersValue, getResultByTickerEachMonth }
