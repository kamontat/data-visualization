import type { LogoutFn } from "src/interfaces/actions";

import firebase from 'firebase/app'

const logout: LogoutFn = () => firebase.auth().signOut();

export default logout