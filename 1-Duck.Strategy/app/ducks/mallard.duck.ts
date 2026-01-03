import { WingsFlyStrategy } from "@/strategies/wings-fly.strategy";
import { Duck } from "./duck";

export class Mallard extends Duck {
  constructor() {
    super();
    this.setFlyStrategy(new WingsFlyStrategy());
  }

  display() {
    console.log("I'm a mallard duck!");
  }
}
