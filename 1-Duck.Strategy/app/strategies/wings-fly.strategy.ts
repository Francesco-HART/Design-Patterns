import { FlyStrategy } from "./fly.strategy";

export class WingsFlyStrategy implements FlyStrategy {
  fly(): void {
    console.log("Flying with wings!");
  }
}
