import type { LoginFn } from "src/interfaces/actions";

import firebase from "firebase/app";

const login: LoginFn = (email, password) => firebase.auth().signInWithEmailAndPassword(email, password);

export default login;
