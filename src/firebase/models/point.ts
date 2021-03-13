import type { DataPoints, DataPoint } from "../interfaces/point";

import { DEFAULT_GROUP_NAME } from "../constants/default";
import { isExist } from "../utils/checker";

export const convertDataPoint = (key?: string, point?: Partial<DataPoint>): DataPoint | undefined => {
  const _key = point?.id ?? key;

  if (!isExist(_key)) return undefined;
  if (!isExist(point?.value)) return undefined;

  return {
    id: _key,
    value: point?.value,
    timestamp: point?.timestamp ?? +new Date(),
    group: point?.group ?? DEFAULT_GROUP_NAME,
  };
};

export const convertDataPoints = (key?: string, raw?: Partial<DataPoint>): DataPoints | undefined => {
  const point = convertDataPoint(key, raw);
  if (isExist(point))
    return {
      [point.id]: point,
    };

  return undefined;
};

export const toDataPoints = (group?: DataPoints<Partial<DataPoint> | undefined>): DataPoints => {
  if (!isExist(group)) return {};

  const keys = Object.keys(group);
  if (keys.length < 1) return {};

  return keys.reduce((result, key) => {
    const g = convertDataPoints(key, group[key]);
    if (isExist(g)) return Object.assign(result, g);
    else return result;
  }, {} as DataPoints);
};
