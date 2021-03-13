export interface DataGroupDetail {
  id: string;
  name: string;
  description: string;
  color: string;
  timestamp: number;
}

export interface DataGroup<D = DataGroupDetail> {
  [id: string]: D;
}
