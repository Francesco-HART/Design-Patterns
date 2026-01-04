import { Pizza } from "./pizza";

export class NapoliStyleMargheritaPizza implements Pizza {
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

export class ChicagoStyleMargheritaPizza implements Pizza {
  getName(): string {
    return "Chicago Margherita Pizza";
  }

  prepare(): void {
    console.log("Preparing Chicago Margherita Pizza");
  }

  bake(): void {
    console.log("Baking Chicago Margherita Pizza");
  }

  cut(): void {
    console.log("Cutting Chicago Margherita Pizza");
  }

  box(): void {
    console.log("Boxing Chicago Margherita Pizza");
  }
}
