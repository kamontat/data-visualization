import type { Record } from "../interfaces/record";

import { GROUP_PATH, POINT_PATH } from "../constants/path";

const record = (record?: Partial<Record>): Record => {
  return {
    [GROUP_PATH]: record?.[GROUP_PATH] ?? {},
    [POINT_PATH]: record?.[POINT_PATH] ?? {},
  };
};

export default record;
