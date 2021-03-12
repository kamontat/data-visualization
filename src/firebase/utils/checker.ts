export const isExist = <T = unknown>(s: T | undefined | null): s is T => {
  return s !== undefined && s !== null;
};

export const isString = (s: unknown): s is string => {
  return typeof s === "string" && s !== "";
};
