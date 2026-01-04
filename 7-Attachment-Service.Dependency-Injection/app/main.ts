import express, { NextFunction, Request, Response } from "express";
import { Attachment, Destination, StorageParams } from "./storage.service.ts";
import multer from "multer";
import * as path from "path";
import { IStorage } from "./IStorage.interface";
import { StorageFactory } from "./storage.factory";

// -----------------------------------------------------------------------------
// ThreatProtectScanner (dummy pour le kata)
// -----------------------------------------------------------------------------
class ThreatProtectScanner {
  async scan(_filePath: string): Promise<boolean> {
    // Simulation d'un scan antivirus
    // Retourne false = pas de virus détecté
    return false;
  }
}
interface SFTPConfig {
  sftp_host: string;
  sftp_port: number;
  sftp_username: string;
  sftp_private_key: string;
}

interface WebDavConfig {
  webdav_url: string;
  webdav_authorization_key: string;
  local_path: string;
}

export type StorageConfiguration = StorageParams & {
  // SFTP enabled companies
  sftp_companies?: { [companyId: string]: SFTPConfig };

  // WebDav enabled companies
  webdav_companies?: { [companyId: string]: WebDavConfig };
};

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
const upload = multer({
  dest: path.join(process.cwd(), "uploads"),
});

// -----------------------------------------------------------------------------
// Fake auth middleware (kata)
// -----------------------------------------------------------------------------
interface AuthenticatedRequest extends Request {
  userId?: string;
  companyId?: string;
}

const auth_required = (
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
) => {
  // Fake auth — en vrai ce serait un JWT / session / etc.
  req.userId = "user-123";
  req.companyId = "company-456";
  next();
};

// -----------------------------------------------------------------------------
// Fake storage configuration (par company)
// -----------------------------------------------------------------------------
const storageConfig: StorageConfiguration = {
  destination: Destination.S3,
  aws_access_key_id: "FAKE_AWS_KEY",
  aws_secret_access_key: "FAKE_AWS_SECRET",
};

// POST route
app.post(
  "/attachment/upload",
  auth_required,
  upload.single("upload"),
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.userId;
    const companyId = req.companyId;

    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    try {
      const attachment: Attachment = {
        message_id: "some-message-id",
        userId: userId!,
        local_path: file.path,
        preview_local_path: "some/preview/path", // Adjust as necessary
      };

      // Déterminer les paramètres de storage selon la company
      const storageParams = getStorageParamsForCompany(
        companyId || "default",
        storageConfig
      );

      // Créer le storage avec la factory
      const storage = StorageFactory.createStorage(storageParams);

      // Uploader avec injection de dépendance
      const request = new UploadRequest(storage);
      const attachmentId = await request.upload(attachment, file.mimetype);

      res.status(200).json({ attachmentId });
    } catch (error) {
      res.status(500).json({ error: "Upload failed", details: error });
    }
  }
);

/**
 * Détermine les paramètres de storage pour une company donnée
 */
function getStorageParamsForCompany(
  companyId: string,
  config: StorageConfiguration
): StorageParams {
  // Vérifier si la company a une config SFTP spécifique
  if (config.sftp_companies && config.sftp_companies[companyId]) {
    const sftp = config.sftp_companies[companyId];
    return {
      destination: Destination.SFTP,
      sftp_host: sftp.sftp_host,
      sftp_port: sftp.sftp_port,
      sftp_username: sftp.sftp_username,
      sftp_private_key: sftp.sftp_private_key,
    };
  }

  // Vérifier si la company a une config WebDAV spécifique
  if (config.webdav_companies && config.webdav_companies[companyId]) {
    const webdav = config.webdav_companies[companyId];
    return {
      destination: Destination.WebDav,
      webdav_url: webdav.webdav_url,
      webdav_authorization_key: webdav.webdav_authorization_key,
      local_path: webdav.local_path,
    };
  }

  // Par défaut: S3
  return {
    destination: Destination.S3,
    aws_access_key_id: config.aws_access_key_id,
    aws_secret_access_key: config.aws_secret_access_key,
  };
}

class UploadRequest {
  private readonly storage: IStorage;

  constructor(storage: IStorage) {
    this.storage = storage;
  }

  async upload(attachment: Attachment, _mimeType: string): Promise<string> {
    const scanner = new ThreatProtectScanner();

    if (await scanner.scan(attachment.local_path)) {
      throw new Error("Virus detected in attachment");
    }

    return this.storage.upload(attachment);
  }
}

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
