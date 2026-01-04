interface Shape {
  getArea(): number;
}

class Rectangle implements Shape {
  protected width: number = 0;
  protected height: number = 0;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  setWidth(width: number) {
    this.width = width;
  }

  setHeight(height: number) {
    this.height = height;
  }

  getArea(): number {
    return this.width * this.height;
  }
}

class Square implements Shape {
  private size: number = 0;

  constructor(size: number) {
    this.size = size;
  }

  setSize(size: number) {
    this.size = size;
  }

  getArea(): number {
    return this.size * this.size;
  }
}

function computeArea(shape: Shape): number {
  return shape.getArea();
}

computeArea(new Rectangle(5, 10)); // 50
computeArea(new Square(5));
