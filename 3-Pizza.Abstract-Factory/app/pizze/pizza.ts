export abstract class Pizza {
  protected name!: string;

  prepare(): void {
    console.log(`Preparing ${this.name}`);
  }

  bake(): void {
    console.log(`Baking ${this.name}`);
  }

  cut(): void {
    console.log(`Cutting ${this.name}`);
  }

  box(): void {
    console.log(`Boxing ${this.name}`);
  }

  getName(): string {
    return this.name;
  }
}
