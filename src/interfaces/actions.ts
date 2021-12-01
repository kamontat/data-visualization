import type Firebase from "firebase/app";

export type LoginFn = (email: string, password: string) => Promise<Firebase.auth.UserCredential>;

export type LogoutFn = () => Promise<void>;
