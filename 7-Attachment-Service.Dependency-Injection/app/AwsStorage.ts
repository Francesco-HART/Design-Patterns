import * as AWS from "aws-sdk";
import * as crypto from "crypto";
import * as fs from "fs";
import { Attachment } from "./storage.service.ts";
import { IStorage } from "./IStorage.interface";

/**
 * Implémentation du stockage AWS S3
 */
export class AwsStorage implements IStorage {
  private readonly accessKeyId: string;
  private readonly secretAccessKey: string;
  private readonly s3: AWS.S3;

  constructor(accessKeyId: string, secretAccessKey: string) {
    this.accessKeyId = accessKeyId;
    this.secretAccessKey = secretAccessKey;

    // Configuration AWS
    this.s3 = new AWS.S3({
      accessKeyId: this.accessKeyId,
      secretAccessKey: this.secretAccessKey,
    });
  }

  async upload(attachment: Attachment): Promise<string> {
    const attachmentId = crypto.randomUUID();
    const s3 = new AWS.S3();

    const mainUpload = s3.upload({
      Bucket: this.bucketName,
      Key: `${attachmentId}`,
      Metadata: { messageId: attachment.message_id },
      Body: fs.createReadStream(attachment.local_path),
    });

    const uploads = [mainUpload.promise()];

    if (attachment.preview_local_path) {
      const previewUpload = s3.upload({
        Bucket: this.bucketName,
        Key: `${attachmentId}-preview`,
        Metadata: { messageId: attachment.message_id },
        Body: fs.createReadStream(attachment.preview_local_path),
      });
      uploads.push(previewUpload.promise());
    }

    await Promise.all(uploads);

    return attachmentId;
  }
}
