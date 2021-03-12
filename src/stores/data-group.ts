import type Firebase from "firebase";
import type { DataGroup } from "../firebase/interfaces/group";

import debug from "debug";
import { writable } from "svelte/store";

import { buildRef } from "../firebase/utils/path";
import { GROUP_PATH } from "../firebase/constants/path";
import { convertGroup, defaultGroup } from "../firebase/models/group";

const logger = debug("stores").extend("data-group");

export const dataGroup = writable<DataGroup>({});

enum Type {
  ADDED = "added",
  CHANGED = "changed",
  REMOVED = "removed",
}

export const updateDataGroup = (firebase: typeof Firebase): (() => void) => {
  const action = (type: Type, data: Firebase.database.DataSnapshot) => {
    logger("Data got '%s'", type.toString());
    const group = convertGroup(data.ref.key, data.val());
    dataGroup.update(old => {
      if (type === Type.REMOVED) {
        delete old[data.key];
        return old;
      } else return Object.assign(old, group);
    });
  };

  const ref = buildRef(firebase, GROUP_PATH);
  const addingAction = ref.on("child_added", d => action(Type.ADDED, d));
  const changingAction = ref.on("child_changed", d => action(Type.CHANGED, d));
  const removingAction = ref.on("child_removed", d => action(Type.REMOVED, d));

  return () => {
    ref.off("child_added", addingAction);
    ref.off("child_changed", changingAction);
    ref.off("child_removed", removingAction);
  };
};

export const pushDataGroup = (firebase: typeof Firebase): (() => void) => {
  return dataGroup.subscribe(group => {
    if (Object.keys(group).length > 0) {
      const ref = buildRef(firebase, GROUP_PATH);
      ref.transaction(current => {
        if (!current) {
          logger("generate default value in server");
          return defaultGroup;
        }

        const currentKey = Object.keys(current);
        const nextKey = Object.keys(group);

        if (currentKey.length !== nextKey.length) {
          logger("updating data in server");
          return group;
        }

        logger("abort transacion due to data local and server are synced");
        return;
      });
    }
  });
};
