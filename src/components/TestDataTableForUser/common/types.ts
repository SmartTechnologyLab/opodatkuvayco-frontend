import type { Deal } from '@/components/common/DataTable/mocks'
import { TableSize } from './constants'

export type TableSizes = TableSize.LG | TableSize.SM

export type RecalculateDeal = (deal: Deal) => void
