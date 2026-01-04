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

interface IUploadable {
  getBytes(): Promise<string[]>;
}

class UploadablePicture implements IUploadable {
  constructor(private readonly picture: IPicture) {}

  getBytes(): Promise<string[]> {
    return this.picture.getBytes();
  }
}

class UploadableVideo implements IUploadable {
  constructor(private readonly video: IVideo) {}

  async getBytes(): Promise<string[]> {
    const chucks = await this.video.getChunks();
    return chucks.flat();
  }
}

class Uploader {
  async upload(file: IUploadable) {
    const bytes = await file.getBytes();
    // process bytes
  }
}
