import { Destination, StorageParams } from "./storage.service.ts";
import { IStorage } from "./IStorage.interface";
import { AwsStorage } from "./AwsStorage";
import { SftpStorage } from "./SftpStorage";
import { WebDavStorage } from "./WebDavStorage";

export class StorageFactory {
  static createStorage(params: StorageParams): IStorage {
    switch (params.destination) {
      case Destination.S3:
        if (!params.aws_access_key_id || !params.aws_secret_access_key) {
          throw new Error("Missing AWS credentials for S3 storage");
        }
        return new AwsStorage(
          params.aws_access_key_id,
          params.aws_secret_access_key
        );

      case Destination.SFTP:
        if (
          !params.sftp_host ||
          !params.sftp_port ||
          !params.sftp_username ||
          !params.sftp_private_key
        ) {
          throw new Error("Missing SFTP credentials");
        }
        return new SftpStorage(
          params.sftp_host,
          params.sftp_port,
          params.sftp_username,
          params.sftp_private_key
        );

      case Destination.WebDav:
        if (!params.webdav_url || !params.webdav_authorization_key) {
          throw new Error("Missing WebDAV credentials");
        }
        return new WebDavStorage(
          params.webdav_url,
          params.webdav_authorization_key
        );

      default:
        throw new Error(`Unknown storage destination: ${params.destination}`);
    }
  }
}
