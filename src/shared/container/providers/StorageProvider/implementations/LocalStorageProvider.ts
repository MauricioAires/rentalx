import fs from "node:fs";
import path from "node:path";

import { Folder, IStorageProvider } from "../IStorageProvider";
import upload from "@config/upload";

export class LocalStorageProvider implements IStorageProvider {
  async save(file: string, folder: Folder): Promise<string> {
    const oldPath = path.resolve(upload.tmpFolder, file);
    const newPath = path.resolve(`${upload.tmpFolder}/${folder}`, file);

    // Remove o arquivo da pasta oldPath e insere na pasts newPath
    fs.promises.rename(oldPath, newPath);

    return file;
  }
  async delete(file: string, folder: Folder): Promise<void> {
    const fileName = path.resolve(`${upload.tmpFolder}/${folder}`, file);

    try {
      // NOTE: Verifica se o arquivo existe
      await fs.promises.stat(fileName);
    } catch (error) {
      return;
    }

    // NOTE: Exclui o arquivo
    await fs.promises.unlink(fileName).then(() => {
      console.log("File deleted successfully on local storage");
    });
  }
}
