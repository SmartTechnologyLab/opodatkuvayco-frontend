import { CSS_VARIABLES } from './constants'
import type { ChartData } from './types'

export const setDataBackgroundColor = (labelsLength: number) => CSS_VARIABLES.slice(0, labelsLength)

export const setChartData = (data: number[], labels?: string[]): ChartData => ({
  labels,
  datasets: [
    {
      data,
      backgroundColor: setDataBackgroundColor(labels?.length ?? CSS_VARIABLES.length)
    }
  ]
})
