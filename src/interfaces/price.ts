export interface Price {
  category: string;
  amount: number;
  timestamp: number;
}

export interface PriceObject extends Price {
  key: string;
}
