import type Firebase from "firebase";
import type { DataPoints } from "../firebase/interfaces/point";

import debug from "debug";
import { writable } from "svelte/store";

import { buildRef } from "../firebase/utils/path";
import { POINT_PATH } from "../firebase/constants/path";
import { convertDataPoints } from "../firebase/models/point";

const logger = debug("stores").extend("data-point");

export const dataPoint = writable<DataPoints>({});

enum Type {
  ADDED = "added",
  CHANGED = "changed",
  REMOVED = "removed",
}

export const updateDataPoint = (firebase: typeof Firebase): (() => void) => {
  const action = (type: Type, data: Firebase.database.DataSnapshot) => {
    logger("Data got '%s'", type.toString());
    const points = convertDataPoints(data.ref.key, data.val());
    dataPoint.update(old => {
      if (type === Type.REMOVED) {
        delete old[data.key];
        return old;
      } else return Object.assign(old, points);
    });
  };

  const ref = buildRef(firebase, POINT_PATH);
  const addingAction = ref.on("child_added", d => action(Type.ADDED, d));
  const changingAction = ref.on("child_changed", d => action(Type.CHANGED, d));
  const removingAction = ref.on("child_removed", d => action(Type.REMOVED, d));

  return () => {
    ref.off("child_added", addingAction);
    ref.off("child_changed", changingAction);
    ref.off("child_removed", removingAction);
  };
};

export const pushDataPoint = (firebase: typeof Firebase): (() => void) => {
  return dataPoint.subscribe(points => {
    if (Object.keys(points).length > 0) {
      const ref = buildRef(firebase, POINT_PATH);
      ref.transaction(current => {
        if (!current) {
          logger("adding data in server");
          return points;
        }

        const currentKey = Object.keys(current); // server data
        const nextKey = Object.keys(points); // local data

        if (currentKey.length !== nextKey.length) {
          logger("updating data in server");
          return points;
        }

        logger("abort transacion due to data local and server are synced");
        return;
      });
    }
  });
};
