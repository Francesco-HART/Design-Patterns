import * as crypto from "crypto";
import * as sftp from "ssh2-sftp-client";
import { Attachment } from "./storage.service.ts";
import { IStorage } from "./IStorage.interface";

/**
 * Implémentation du stockage SFTP
 */
export class SftpStorage implements IStorage {
  private readonly host: string;
  private readonly port: number;
  private readonly username: string;
  private readonly privateKey: string;
  private readonly client = new sftp();

  constructor(
    host: string,
    port: number,
    username: string,
    privateKey: string
  ) {
    this.host = host;
    this.port = port;
    this.username = username;
    this.privateKey = privateKey;
  }

  async upload(attachment: Attachment): Promise<string> {
    const attachmentId = crypto.randomUUID();
    const client = new sftp();

    const config: sftp.ConnectOptions = {
      host: this.host,
      port: this.port,
      username: this.username,
      privateKey: this.privateKey,
    };

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

    return attachmentId;
  }
}
