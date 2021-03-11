import type { PriceReceivers } from "../interfaces/actions";

import firebase from "firebase/app";

import { getRef } from "./internal/get-ref";

import { convertMap } from "./internal/price";

const listPrices: PriceReceivers = async () => {
  const data = await getRef(firebase, "prices").get();
  return convertMap(data.val());
};

export default listPrices;
