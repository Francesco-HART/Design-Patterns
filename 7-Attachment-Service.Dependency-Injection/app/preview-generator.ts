import { ImageScaler } from "./sharp-image-scaler";

export interface IPreviewGenerator {
  /**
   * Génère une prévisualisation pour un fichier donné
   *
   * @param filePath le chemin du fichier à prévisualiser
   * @returns Promise<string> le chemin de la prévisualisation générée
   */
  generatePreview(filePath: string): Promise<string>;
}

export class DocumentPreviewGenerator implements IPreviewGenerator {
  async generatePreview(filePath: string): Promise<string> {
    // Simuler la génération d'une prévisualisation de document
    const previewPath = `${filePath}-document-preview.pdf`;
    console.log(`🖨️ Generating document preview for ${filePath}`);
    // Logique de génération de prévisualisation ici...
    return previewPath;
  }
}

export class VideoPreviewGenerator implements IPreviewGenerator {
  async generatePreview(filePath: string): Promise<string> {
    // Simuler la génération d'une prévisualisation vidéo
    const previewPath = `${filePath}-video-preview.mp4`;
    console.log(`🎬 Generating video preview for ${filePath}`);
    // Logique de génération de prévisualisation ici...
    return previewPath;
  }
}

export class ImagePreviewGenerator implements IPreviewGenerator {
  imageScaler: ImageScaler;
  private MAX_PREVIEW_SIZE_PX = 300;
  constructor(scaler: ImageScaler) {
    this.imageScaler = scaler;
  }
  async generatePreview(filePath: string): Promise<string> {
    return this.imageScaler.scale(filePath, this.MAX_PREVIEW_SIZE_PX);
  }
}

export class PreviewFactory {
  private static generators: Map<string, IPreviewGenerator> = new Map([]);

  static createPreviewGenerator(fileType: string): IPreviewGenerator {
    const generator = PreviewFactory.generators.get(fileType);
    if (!generator) {
      throw new Error(`No preview generator found for file type: ${fileType}`);
    }
    return generator;
  }

  register(fileType: string, generator: IPreviewGenerator): void {
    PreviewFactory.generators.set(fileType, generator);
  }
}
