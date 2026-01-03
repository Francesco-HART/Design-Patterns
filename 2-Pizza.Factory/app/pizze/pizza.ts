export interface Pizza {
  getName(): string;
  prepare(): void;
  bake(): void;
  cut(): void;
  box(): void;
}
