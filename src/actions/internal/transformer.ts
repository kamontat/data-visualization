import type { Price, PriceObject } from "src/interfaces/price";

export const buildPriceObject = (map: Record<string, Price>): PriceObject[] => {
  return Object.keys(map).reduce((result, key) => {
    const price = map[key]

    result.push({
      key: key,
      amount: price.amount,
      timestamp: price.timestamp
    } as PriceObject)
    return result
  }, [])
}
