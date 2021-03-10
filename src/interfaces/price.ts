export interface Price {
  amount: number
  timestamp: number
}

export interface PriceObject extends Price {
  key: string
}
