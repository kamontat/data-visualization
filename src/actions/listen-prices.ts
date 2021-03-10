import { PriceListener, PriceAction } from "../interfaces/actions";

import firebase from "firebase/app";

import { getRef } from "./internal/get-ref";

const listenPrice: PriceListener = async callback => {
  const ref = getRef(firebase, "prices");
  ref.on("child_added", data => {
    callback(PriceAction.ADDED, data.val());
  });

  ref.on("child_changed", data => {
    callback(PriceAction.CHANGED, data.val());
  });

  ref.on("child_removed", data => {
    callback(PriceAction.REMOVED, data.val());
  });
};

export default listenPrice;
