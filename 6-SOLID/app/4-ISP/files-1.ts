/**
 * Interface trop large :
 * - force tous les consommateurs à dépendre de méthodes inutiles
 */
interface IPicture {
  getWidth(): number;
  getHeight(): number;
  getBytes(): Promise<string[]>;
}

interface IVideo {
  getDuration(): number;
  takeScreenshot(): IPicture;
  getChunks(): Promise<string[][]>;
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

class Video implements IVideo {
  getDuration(): number {
    return 0;
  }

  takeScreenshot(): IPicture {
    return new Picture();
  }

  getChunks(): Promise<string[][]> {
    return Promise.resolve([]);
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

  async uploadVideo(video: IVideo) {
    const chunks = await video.getChunks();
    // process chunks
  }
}

// On voit bine un point commun :
// both IPicture and IVideo have a method that returns byte data asynchronously
