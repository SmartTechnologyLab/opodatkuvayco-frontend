import type { ChartDataset } from 'chart.js'

export interface ChartData {
  labels?: string[]
  datasets: Partial<ChartDataset[]>
}
