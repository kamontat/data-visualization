import type { PriceReceivers } from "../interfaces/actions";

import firebase from "firebase/app";

import { getRef } from "./internal/get-ref";
import { buildPriceObject } from "./internal/transformer";

const listPrices: PriceReceivers = async () => {
  const data = await getRef(firebase, "prices").get()
  return buildPriceObject(data.val())
}

export default listPrices;
