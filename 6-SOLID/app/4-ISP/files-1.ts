/**
 * Interface trop large :
 * - force tous les consommateurs à dépendre de méthodes inutiles
 */
interface IPicture {
  getWidth(): number;
  getHeight(): number;
  getBytes(): Promise<string[]>;
}

class Picture implements IPicture {
  getBytes(): Promise<string[]> {
    return Promise.resolve([]);
  }

  getWidth(): number {
    return 0;
  }

  getHeight(): number {
    return 0;
  }
}

/**
 * ❌ PROBLÈME :
 * Uploader n’a besoin QUE des bytes,
 * mais dépend quand même de getWidth / getHeight
 */
class Uploader {
  async uploadPicture(picture: IPicture) {
    const bytes = await picture.getBytes();
    // process bytes
  }
}
