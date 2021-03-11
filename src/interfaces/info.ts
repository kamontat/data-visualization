type ModeName = "development" | "production";

export interface ApplicationInfo {
  mode: ModeName;
  name: string;
  description: string;
  version: string;
  date: Date;
  license: string;
  author: {
    name: string;
    url: string;
  };
}
