import type Firebase from "firebase";

import debug from "debug";
import { derived, writable } from "svelte/store";

import { isExist } from "../firebase/utils/checker";
import { clearDataPoint } from "./data-point";
import { clearDataGroup } from "./data-group";

const logger = debug("stores").extend("user");

export const user = writable<Firebase.User | undefined>(undefined);
export const isLogin = derived(user, u => isExist(u));
export const isReady = derived(user, u => u !== undefined);

export const updateUser = (firebase: typeof Firebase): void => {
  firebase.auth().onAuthStateChanged(function (login) {
    logger("Auth action: %s", login ? "Login" : "Logout");
    if (!isExist(login)) {
      clearDataPoint();
      clearDataGroup();
    }

    user.set(login);
  });
};
