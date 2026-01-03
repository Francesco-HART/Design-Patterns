import { Pizza } from "./pizza";

export class MargheritaPizza implements Pizza {
  getName(): string {
    return "Margherita Pizza";
  }

  prepare(): void {
    console.log("Preparing Margherita Pizza");
  }

  bake(): void {
    console.log("Baking Margherita Pizza");
  }

  cut(): void {
    console.log("Cutting Margherita Pizza");
  }

  box(): void {
    console.log("Boxing Margherita Pizza");
  }
}
