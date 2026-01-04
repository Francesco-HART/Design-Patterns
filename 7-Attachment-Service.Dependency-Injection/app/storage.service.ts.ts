import * as crypto from "crypto";
import * as AWS from "aws-sdk";
import * as fs from "fs";
import * as sftp from "ssh2-sftp-client";

export enum Destination {
  SFTP = "sftp",
  S3 = "S3",
  WebDav = "webdav",
}

export type Attachment = {
  message_id: string;
  local_path: string;
  userId: string;
  preview_local_path: string;
};

export interface StorageParams {
  // The destination for the file upload
  destination: Destination;

  // AWS S3 credentials
  aws_access_key_id?: string;

  // AWS S3 secret access key
  aws_secret_access_key?: string;

  // SFTP credentials
  sftp_host?: string;

  // SFTP port
  sftp_port?: number;

  // SFTP username
  sftp_username?: string;

  // SFTP private key
  sftp_private_key?: string;

  // WebDav credentials
  local_path?: string;

  // WebDav URL
  webdav_url?: string;

  // WebDav authorization key
  webdav_authorization_key?: string;
}

export class StorageService {
  async upload(attachment: Attachment, params: StorageParams): Promise<string> {
    const attachmentId = crypto.randomUUID();

    if (params.destination === Destination.S3) {
      if (!params.aws_access_key_id || !params.aws_secret_access_key) {
        throw new Error("Missing AWS credentials");
      }

      AWS.config.credentials = new AWS.Credentials({
        accessKeyId: params.aws_access_key_id,
        secretAccessKey: params.aws_secret_access_key,
      });

      const s3 = new AWS.S3();
      await this.uploadToS3(
        s3,
        attachmentId,
        attachment.message_id,
        attachment.local_path,
        attachment.preview_local_path
      );
    }

    if (params.destination === Destination.SFTP) {
      if (
        !params.sftp_host ||
        !params.sftp_port ||
        !params.sftp_username ||
        !params.sftp_private_key
      ) {
        throw new Error("Missing SFTP credentials");
      }

      const options = {
        host: params.sftp_host,
        port: params.sftp_port,
        username: params.sftp_username,
        privateKey: params.sftp_private_key,
      };

      await this.uploadToSFTP(attachment, attachmentId, options);
    }

    if (params.destination === Destination.WebDav) {
      if (!params.webdav_url || !params.webdav_authorization_key) {
        throw new Error("Missing WebDav credentials");
      }
      this.uploadToWebDav(
        attachment,
        attachmentId,
        params.webdav_url,
        params.webdav_authorization_key
      );
    }

    return attachmentId;
  }

  private async uploadToS3(
    s3: AWS.S3,
    attachmentId: string,
    messageId: string,
    localPath: string,
    previewLocalPath: string
  ) {
    const mainUpload = s3.upload({
      Bucket: "your-bucket-name",
      Key: `${attachmentId}`,
      Metadata: { messageId },
      Body: fs.createReadStream(localPath),
    });

    const uploads = [mainUpload.promise()];

    if (previewLocalPath) {
      const previewUpload = s3.upload({
        Bucket: "your-bucket-name",
        Key: `${attachmentId}`,
        Metadata: { messageId },
        Body: fs.createReadStream(previewLocalPath),
      });
      uploads.push(previewUpload.promise());
    }

    await Promise.all(uploads);
  }

  private async uploadToSFTP(
    attachment: Attachment,
    attachmentId: string,
    config: sftp.ConnectOptions
  ) {
    const client = new sftp();
    await client.connect(config);

    const mainUpload = client.fastPut(
      attachment.local_path,
      `/${attachmentId}`
    );

    const uploads = [mainUpload];

    if (attachment.preview_local_path) {
      const previewUpload = client.fastPut(
        attachment.preview_local_path,
        `/_preview/${attachmentId}`
      );
      uploads.push(previewUpload);
    }

    await Promise.all(uploads);
    await client.end();
  }

  private async uploadToWebDav(
    attachment: Attachment,
    attachmentId: string,
    webdavUrl: string,
    authorizationKey: string
  ) {
    // Implement WebDav upload logic here
    // This is a placeholder for demonstration purposes
    console.log(
      `Uploading attachment ${attachmentId} to WebDav at ${webdavUrl}`
    );
  }
}
