import * as crypto from "crypto";
import { Attachment } from "./storage.service.ts";
import { IStorage } from "./IStorage.interface";
import { createClient, WebDAVClient } from "webdav";

/**
 * Implémentation du stockage WebDAV
 */
export class WebDavStorage implements IStorage {
  private readonly url: string;
  private readonly client: WebDAVClient;

  constructor(url: string, authorizationKey: string) {
    this.url = url;
    this.client = createClient(url, {
      headers: {
        Authorization: `Bearer ${authorizationKey}`,
      },
    });
  }

  async upload(attachment: Attachment): Promise<string> {
    const attachmentId = crypto.randomUUID();

    // TODO: Implémenter la vraie logique WebDAV
    // Pour l'instant, c'est une simulation
    console.log(
      `📤 Uploading attachment ${attachmentId} to WebDAV at ${this.url}`
    );
    console.log(`   - File: ${attachment.local_path}`);
    console.log(`   - Message ID: ${attachment.message_id}`);
    console.log(`   - User ID: ${attachment.userId}`);

    if (attachment.preview_local_path) {
      console.log(`   - Preview: ${attachment.preview_local_path}`);
    }

    // Simulation d'un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 100));

    return attachmentId;
  }
}
