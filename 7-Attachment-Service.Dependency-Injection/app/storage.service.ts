/**
 * Types et interfaces partagés pour le système de storage
 *
 * Ce fichier contient uniquement les définitions de types.
 * Les implémentations concrètes sont dans :
 * - AwsStorage.ts
 * - SftpStorage.ts
 * - WebDavStorage.ts
 */

/**
 * Destinations de stockage supportées
 */
export enum Destination {
  SFTP = "sftp",
  S3 = "S3",
  WebDav = "webdav",
}

/**
 * Type représentant une pièce jointe
 */
export type Attachment = {
  message_id: string;
  local_path: string;
  userId: string;
  preview_local_path: string;
};

/**
 * Paramètres de configuration pour les différents types de storage
 * Utilisé par la StorageFactory pour créer les bonnes instances
 */
export interface StorageParams {
  // The destination for the file upload
  destination: Destination;

  // AWS S3 credentials
  aws_access_key_id?: string;
  aws_secret_access_key?: string;

  // SFTP credentials
  sftp_host?: string;
  sftp_port?: number;
  sftp_username?: string;
  sftp_private_key?: string;

  // WebDav credentials
  local_path?: string;
  webdav_url?: string;
  webdav_authorization_key?: string;
}
