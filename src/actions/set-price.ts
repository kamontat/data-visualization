import type { PriceCreator } from "../interfaces/actions";

import firebase from "firebase/app";

import { getRef } from "./internal/get-ref";
import { ensurePrice } from "./internal/price";

const setPrice: PriceCreator = async price => {
  const newPrice = getRef(firebase, "prices").push();

  await getRef(firebase, "price").set(newPrice.key);
  await newPrice.set(ensurePrice(price));
};

export default setPrice;
