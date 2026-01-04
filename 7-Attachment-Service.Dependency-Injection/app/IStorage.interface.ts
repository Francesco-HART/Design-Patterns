import { Attachment } from "./storage.service.ts";

/**
 * Interface pour les différents types de stockage
 * Respecte le Dependency Inversion Principle (DIP)
 */
export interface IStorage {
	/**
	 * Upload une pièce jointe vers le storage
	 * @param attachment - Les informations de la pièce jointe
	 * @returns L'ID de l'attachement uploadé
	 */
	upload(attachment: Attachment): Promise<string>;
}
