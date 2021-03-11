import type { PriceReceiver } from "../interfaces/actions";

import firebase from "firebase/app";

import { getRef } from "./internal/get-ref";
import { convertPrice, emptyPriceObject } from "./internal/price";

const latestPrices: PriceReceiver = async () => {
  const latest = await getRef(firebase, "price").get();
  const key = latest.val();

  if (!key) return emptyPriceObject();

  const data = await getRef(firebase, "prices").child(key).get();
  return convertPrice(key, data.val());
};

export default latestPrices;
