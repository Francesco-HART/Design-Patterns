import { Pizza } from "./pizza";

export class FrittaPizza implements Pizza {
  getName(): string {
    return "Fritta Pizza";
  }

  prepare(): void {
    console.log("Preparing Fritta Pizza");
  }

  bake(): void {
    console.log("Baking Fritta Pizza");
  }

  cut(): void {
    console.log("Cutting Fritta Pizza");
  }

  box(): void {
    console.log("Boxing Fritta Pizza");
  }
}
