export interface DataGroupDetail {
  id: string;
  name: string;
  timestamp: number;
}

export interface DataGroup<D = DataGroupDetail> {
  [id: string]: D;
}
