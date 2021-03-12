export interface DataPoint {
  id: string;
  value: number;
  timestamp: number;
  group: string;
}

export interface DataPoints<D = DataPoint> {
  [id: string]: D;
}
