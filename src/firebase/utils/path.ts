import type Firebase from "firebase";

import { USER_PATH, VERSION_PATH } from "../constants/path";
import { isExist } from "./checker";

export const buildRef = (firebase: typeof Firebase, ...path: string[]): Firebase.database.Reference => {
  const userPath = [USER_PATH, firebase.auth().currentUser?.uid, VERSION_PATH]
    .concat(...path)
    .filter(v => isExist(v))
    .join("/");

  return firebase.database().ref(userPath);
};
