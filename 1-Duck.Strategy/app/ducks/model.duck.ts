import { NoFlyStrategy } from "@/strategies/no-fly.strategy";
import { Duck } from "./duck";

export class ModelDuck extends Duck {
  constructor() {
    super();
    this.setFlyStrategy(new NoFlyStrategy());
  }

  display() {
    console.log("I'm a model duck!");
  }
}
