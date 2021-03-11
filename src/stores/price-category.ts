import firebase from "firebase/app";
import { derived, Readable, readable } from "svelte/store";

import { getRef } from "../actions/internal/get-ref";

export interface PriceCategory {
  id: string;
  text: string;
}

export type PriceCategoryMap = Record<string, string>;

const defaultCategories: PriceCategoryMap = {
  "-": "Default",
  A: "Class A",
  B: "Class B",
  C: "Class C",
  D: "Class D",
  E: "Class E",
};

export const priceCategoryMap = readable<PriceCategoryMap>({}, set => {
  const ref = getRef(firebase, "categories");

  ref.get().then(data => {
    const category: PriceCategoryMap = data.exists() ? data.val() : defaultCategories;

    if (!data.exists()) {
      ref.update(defaultCategories);
    }

    set(category);
  });
});

export const priceCategories = derived<Readable<PriceCategoryMap>, PriceCategory[]>(
  priceCategoryMap,
  (category, set) => {
    set(
      Object.keys(category).map(key => ({
        id: key,
        text: category[key],
      }))
    );
  }
);
