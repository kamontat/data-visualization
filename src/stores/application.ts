import type { ApplicationInfo } from "../interfaces/info";
import { writable } from "svelte/store";

export const application = writable({
  mode: "development",
  name: "",
  version: "",
  description: "",
  date: new Date(),
} as ApplicationInfo);

export const updateApplication = (info: ApplicationInfo): void => {
  application.set(info);
};
