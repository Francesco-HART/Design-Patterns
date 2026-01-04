import sharp from "sharp";

export interface ImageScaler {
  /**
   * Redimensionne une image et sauvegarde le résultat dans un fichier temporaire.
   *
   * @param inputPath Chemin de l'image d'entrée
   * @param width Largeur souhaitée
   * @param height Hauteur souhaitée
   * @returns Promise<string> Chemin du fichier temporaire redimensionné
   */
  scale(inputPath: string, maxWidth: number): Promise<string>;

  /**   * Vérifie si le type MIME est supporté pour le redimensionnement
   *
   * @param mimeType Type MIME du fichier
   * @returns boolean true si supporté, false sinon
   */
  supported(mimeType: string): boolean;
}

export class SharpImageScaler implements ImageScaler {
  async scale(inputPath: string, maxWidth: number): Promise<string> {
    const outputPath = `${inputPath}-scaled.jpg`;
    await sharp(inputPath).resize({ width: maxWidth }).toFile(outputPath);
    return outputPath;
  }

  supported(mimeType: string): boolean {
    const supportedMimeTypes = ["image/jpeg", "image/png", "image/webp"];
    return supportedMimeTypes.includes(mimeType);
  }
}
