import type { PriceCreator } from "../interfaces/actions";
import type { Price } from "../interfaces/price";

import firebase from "firebase/app";

import { getRef } from "./internal/get-ref";

const setPrice: PriceCreator = async (price: number) => {
  const newPrice = getRef(firebase, "prices").push()
  
  await getRef(firebase, "price").set(newPrice.key)
  await newPrice.set({
    amount: price,
    timestamp: +new Date()
  } as Price)
}

export default setPrice;
