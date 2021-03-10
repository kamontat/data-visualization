import type Firebase from 'firebase/app'

import type { Price, PriceObject } from './price'

export type LoginFn = (email: string, password: string) => Promise<Firebase.auth.UserCredential>

export type LogoutFn = () => Promise<void>

export type PriceCreator = (price: number) => Promise<void>

export type PriceReceivers = () => Promise<PriceObject[]>

export type PriceReceiver = () => Promise<PriceObject>

export enum PriceAction {
  ADDED = "ADDED",
  CHANGED = "CHANGED",
  REMOVED = "REMOVED"
}

type PriceListenerFn = (type: PriceAction, data: Price) => void
export type PriceListener = (fn: PriceListenerFn) => void
