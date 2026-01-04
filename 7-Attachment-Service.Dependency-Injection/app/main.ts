import express, { NextFunction, Request, Response } from "express";
import { Attachment, Destination, StorageParams } from "./storage.service.ts";
import multer from "multer";
import * as path from "path";
import { IStorage } from "./IStorage.interface";
import { StorageFactory } from "./storage.factory";
import {
  Scanner,
  SynergySecurityScanner,
  ThreatProtectScannerMiddleware,
} from "./scanner.middleware.js";
import { SharpImageScaler } from "./sharp-image-scaler.js";

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

const imageScaler = new SharpImageScaler();
const isProduction = process.env.NODE_ENV === "production";
const virusScanner = isProduction
  ? new ThreatProtectScannerMiddleware()
  : new SynergySecurityScanner();
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

      // Créer le storage avec la factory
      const storage = StorageFactory.createStorage(storageConfig);

      // Uploader avec injection de dépendance
      const request = new UploadRequest(storage, virusScanner, imageScaler);
      const attachmentId = await request.upload(attachment, file.mimetype);

      res.status(200).json({ attachmentId });
    } catch (error) {
      res.status(500).json({ error: "Upload failed", details: error });
    }
  }
);

class UploadRequest {
  private readonly storage: IStorage;
  private readonly scanner: Scanner;
  private readonly imageScaler: SharpImageScaler;

  private readonly MAX_IMAGE_SIZE_PX = 500;

  constructor(
    storage: IStorage,
    scanner: Scanner,
    imageScaler: SharpImageScaler
  ) {
    this.storage = storage;
    this.scanner = scanner;
    this.imageScaler = imageScaler;
  }

  async upload(attachment: Attachment, _mimeType: string): Promise<string> {
    if (await this.scanner.scan(attachment.local_path)) {
      throw new Error("Virus detected in attachment");
    }

    if (this.imageScaler.supported(_mimeType)) {
      console.log(`🖼️ Scaling image attachment for user ${attachment.userId}`);
      attachment.preview_local_path = await this.imageScaler.scale(
        attachment.local_path,
        this.MAX_IMAGE_SIZE_PX
      );
    }

    return this.storage.upload(attachment);
  }
}

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
