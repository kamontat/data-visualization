import type { DataGroup, DataGroupDetail } from "../interfaces/group";

import { isExist } from "../utils/checker";

export const defaultGroup = {
  "-": {
    id: "-",
    name: "Default",
    timestamp: +new Date(),
  },
};

export const convertGroupDetail = (key?: string, detail?: Partial<DataGroupDetail>): DataGroupDetail | undefined => {
  const _key = detail?.id ?? key;

  if (!isExist(_key)) return undefined;
  if (!isExist(detail?.name)) return undefined;

  return {
    id: _key,
    name: detail?.name,
    timestamp: detail?.timestamp ?? +new Date(),
  };
};

export const convertGroup = (key?: string, raw?: Partial<DataGroupDetail>): DataGroup | undefined => {
  const detail = convertGroupDetail(key, raw);
  if (isExist(detail))
    return {
      [detail.id]: detail,
    };

  return undefined;
};

export const toGroup = (group?: DataGroup<Partial<DataGroupDetail> | undefined>): DataGroup => {
  if (!isExist(group)) return {};

  const keys = Object.keys(group);
  if (keys.length < 1) return {};

  return keys.reduce((result, key) => {
    const g = convertGroup(key, group[key]);
    if (isExist(g)) return Object.assign(result, g);
    else return result;
  }, {} as DataGroup);
};
