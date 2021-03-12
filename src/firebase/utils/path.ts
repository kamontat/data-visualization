import type Firebase from "firebase";
import debug from "debug";

import { USER_PATH, VERSION_PATH } from "../constants/path";
import { isExist } from "./checker";

const logger = debug("firebase").extend("utils");
export const buildRef = (firebase: typeof Firebase, ...path: string[]): Firebase.database.Reference => {
  const userPath = [USER_PATH, firebase.auth().currentUser?.uid, VERSION_PATH]
    .concat(...path)
    .filter(v => isExist(v))
    .join("/");

  logger("buildRef", userPath);
  return firebase.database().ref(userPath);
};
