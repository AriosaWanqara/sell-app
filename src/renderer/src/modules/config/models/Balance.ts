import { BalanceType } from './BalanceType'

export interface Balance {
  id: string
  port: string
  getWeightTimer: number
  balanceType: BalanceType
}
export interface postBalance {
  id: string | null
  port: string | null
  getWeightTimer: number | null
  balanceType: number | null
}
