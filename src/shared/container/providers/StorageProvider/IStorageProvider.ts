export type Folder = "avatar" | "cars";

export interface IStorageProvider {
  save(file: string, folder: Folder): Promise<string>;
  delete(file: string, folder: Folder): Promise<void>;
}
