import type Firebase from "firebase/app";

type RefType = "price" | "prices" | "categories";

export const getRef = (
  fb: typeof Firebase,
  type: RefType,
  user: Firebase.User = fb.auth().currentUser
): Firebase.database.Reference => {
  return fb.database().ref(`users/${user.uid}/${type}`);
};
