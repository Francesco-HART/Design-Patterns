import { FlyStrategy } from "../strategies/fly.strategy";

export class Duck {
  private flyStrategy!: FlyStrategy;

  fly() {
    this.flyStrategy.fly();
  }

  setFlyStrategy(flyStrategy: FlyStrategy) {
    this.flyStrategy = flyStrategy;
  }

  swim() {
    console.log("Swimming!");
  }

  display() {
    console.log("I'm a duck!");
  }
}
