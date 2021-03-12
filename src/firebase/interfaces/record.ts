import type { GROUP_PATH, POINT_PATH } from "../constants/path";

import type { DataGroup } from "./group";
import type { DataPoints } from "./point";

export interface Record {
  [POINT_PATH]: DataPoints;
  [GROUP_PATH]: DataGroup;
}
