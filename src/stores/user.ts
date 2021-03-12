import type Firebase from "firebase";

import debug from "debug";
import { derived, writable } from "svelte/store";

import { isExist } from "../firebase/utils/checker";

const logger = debug("stores").extend("user");

export const user = writable<Firebase.User | undefined>(undefined);
export const isLogin = derived(user, u => isExist(u));
export const isReady = derived(user, u => u !== undefined);

export const updateUser = (firebase: typeof Firebase): void => {
  firebase.auth().onAuthStateChanged(function (login) {
    logger("Auth action: %s", login ? "Login" : "Logout");
    user.set(login);
  });
};
