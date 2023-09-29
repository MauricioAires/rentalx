import { S3 } from "aws-sdk";
import path from "node:path";
import fs from "node:fs";
import mime from "mime";
import { Folder, IStorageProvider } from "../IStorageProvider";
import upload from "@config/upload";

export class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new S3({
      region: process.env.AWS_BUCKET_REGION,
    });
  }

  async save(file: string, folder: Folder): Promise<string> {
    const originalName = path.resolve(upload.tmpFolder, file);

    const fileContent = await fs.promises.readFile(originalName);

    await this.client
      .putObject({
        Bucket: `${process.env.AWS_BUCKET}/${folder}`,
        Key: file,
        Body: fileContent,
        ACL: "public-read",
        ContentType: mime.getExtension(originalName),
      })
      .promise();

    await fs.promises.unlink(originalName);

    return file;
  }
  async delete(file: string, folder: Folder): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: `${process.env.AWS_BUCKET}/${folder}`,
        Key: file,
      })
      .promise()
      .then(() => {
        console.log("File deleted successfully on bucket S3");
      });
  }
}
