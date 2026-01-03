import { FlyStrategy } from "./fly.strategy";

export class NoFlyStrategy implements FlyStrategy {
  fly(): void {
    console.log("I can't fly.");
  }
}
